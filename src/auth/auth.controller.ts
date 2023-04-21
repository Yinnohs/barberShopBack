import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto, SingInDto } from './dto';

@Controller('/api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  async signup(@Body() singUpDto: SingUpDto) {
    return await this.authService.signup(singUpDto);
  }

  @HttpCode(200)
  @Post('/local/signin')
  async signin(@Body() singInDto: SingInDto) {
    return this.authService.signin(singInDto);
  }

  @Post('/local/signout')
  async signout() {
    return null;
  }

  @Post('/refresh')
  async refreshToken() {
    return null;
  }
}
