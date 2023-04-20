import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
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
