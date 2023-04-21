import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { checkPassword, hashPassword } from './utils';
import { SingInDto, SingUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signupLocal(singUpDto: SingUpDto) {
    const salts = 10;
    const { email, name, password, surname } = singUpDto;

    const userExist = await this.prisma.user.findUnique({ where: { email } });

    if (userExist) {
      throw new BadRequestException('El email ya existe');
    }

    const userPassword = await hashPassword(password, salts);

    const currentDate = new Date();

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: userPassword,
        surname,
        deletedAt: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    });

    return user;
  }

  async signinLocal(singInDto: SingInDto) {
    const { email, password } = singInDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });
    if (!user) {
      throw new BadRequestException('Credenciales Erróneas');
    }
    const isMatch: boolean = await checkPassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Credenciales Erróneas');
    }

    //sign JWT Token
    const payload = { id: user.id, roles: user.roles, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signoutLocal() {
    return null;
  }

  async refreshToken() {
    return null;
  }
}
