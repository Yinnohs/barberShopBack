import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/SignUp.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() singUpdto: SingUpDto) {
    return await this.authService.signup(singUpdto);
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
