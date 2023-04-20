import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SingUpDto } from './dto/SignUp.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(singUpDto: SingUpDto) {
    const { email, name, password, surname } = singUpDto;

    const userExist = await this.prisma.user.findUnique({ where: { email } });

    if (userExist) {
      throw new BadRequestException('El email ya existe');
    }

    return { message: 'signup good' };
  }

  async signin() {
    return { message: 'signin good' };
  }

  async signout() {
    return { message: 'signout good' };
  }
}
