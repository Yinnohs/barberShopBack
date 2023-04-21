import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto, SingInDto } from './dto';

@Controller('/api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  async signupLocal(@Body() singUpDto: SingUpDto) {
    return await this.authService.signupLocal(singUpDto);
  }

  @HttpCode(200)
  @Post('/local/signin')
  async signinLocal(@Body() singInDto: SingInDto) {
    return this.authService.signinLocal(singInDto);
  }

  @Post('/local/signout')
  async signoutLocal() {
    this.authService.signoutLocal();
  }

  @Post('/refresh')
  async refreshToken() {
    this.authService.refreshToken();
  }
}
