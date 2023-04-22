import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { checkPassword, hashPassword } from './utils';
import { SingInDto, SingUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { jwtExpireTime, jwtRefreshSecret, jwtSecret } from './contants';
import { Tokens } from './types';
import { Role } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly salts = 10;

  async signupLocal(singUpDto: SingUpDto) {
    const { email, name, password, surname } = singUpDto;

    const userExist = await this.prisma.user.findUnique({ where: { email } });

    if (userExist) {
      throw new BadRequestException('El email ya existe');
    }

    const userPassword = await hashPassword(password, this.salts);

    const currentDate = new Date();

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: userPassword,
        surname,
        role: ['CLIENT'],
        deletedAt: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    });

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.role as Role[],
    );
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signinLocal(singInDto: SingInDto) {
    const { email, password } = singInDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new ForbiddenException('Credenciales Erróneas');
    }
    const itMatch: boolean = await checkPassword(password, user.password);

    if (!itMatch) {
      throw new ForbiddenException('Credenciales Erróneas');
    }

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.role as Role[],
    );
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return { message: 'Se a deslogeado correctamente' };
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ForbiddenException('Acceso denegado');
    const rtMatches = await checkPassword(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Acceso denegado');

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.role as Role[],
    );
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(userId: number, rt: string) {
    const hash = await hashPassword(rt, this.salts);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(
    userId: number,
    email: string,
    roles: Role[],
  ): Promise<Tokens> {
    const atPromise = this.jwtService.signAsync(
      {
        sub: userId,
        email,
        roles,
      },
      {
        secret: jwtSecret,
        expiresIn: jwtExpireTime,
      },
    );

    const rtPromise = this.jwtService.signAsync(
      {
        sub: userId,
        email,
        roles,
      },
      {
        secret: jwtRefreshSecret,
        expiresIn: jwtExpireTime,
      },
    );

    const [at, rt] = await Promise.all([atPromise, rtPromise]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
