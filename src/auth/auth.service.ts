import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup() {
    return { message: 'signup good' };
  }

  async signin() {
    return { message: 'signin good' };
  }

  async signout() {
    return { message: 'signout good' };
  }
}
