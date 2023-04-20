import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup() {
    return this.authService.signup();
  }

  @Post('/signin')
  async signin() {
    return this.authService.signin();
  }

  @Get('/sigout')
  async signout() {
    return this.authService.signout();
  }
}
