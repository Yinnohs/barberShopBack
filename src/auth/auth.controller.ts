import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto, SingInDto } from './dto';
import { Tokens } from './types';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/common';

@Controller('/api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/local/signup')
  async signupLocal(@Body() singUpDto: SingUpDto): Promise<Tokens> {
    return await this.authService.signupLocal(singUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/local/signin')
  async signinLocal(@Body() singInDto: SingInDto) {
    return this.authService.signinLocal(singInDto);
  }

  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  async logout(@Req() req: Request) {
    const user = req.user;
    console.log(user);
    return this.authService.logout(user['sub']);
  }

  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refreshToken(@Req() req: Request) {
    const user = req.user;
    this.authService.refreshToken(user['sub'], user['refreshToken']);
  }
}
