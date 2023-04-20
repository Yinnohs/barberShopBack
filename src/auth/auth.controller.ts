import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/SignUp.dto';
import { SingInDto } from './dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() singUpDto: SingUpDto) {
    return await this.authService.signup(singUpDto);
  }

  @Post('/signin')
  async signin(@Body() singInDto: SingInDto) {
    return this.authService.signin(singInDto);
  }

  @Get('/sigout')
  async signout() {
    return this.authService.signout();
  }
}
