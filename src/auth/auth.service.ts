import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { checkPassword, hashPassword } from './utils';
import { SingInDto, SingUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(singUpDto: SingUpDto) {
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

  async signin(singInDto: SingInDto) {
    const { email, password } = singInDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Credenciales Erróneas');
    }
    const isMatch: boolean = await checkPassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Credenciales Erróneas');
    }

    //sign JWT Token

    return user;
  }

  async signout() {
    return { message: 'signout good' };
  }
}
