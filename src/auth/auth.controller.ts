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
import { GetCurrentUser } from 'src/common/decorators';

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
  async logout(@GetCurrentUser('sub') id: number) {
    return this.authService.logout(id);
  }

  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refreshToken(
    @GetCurrentUser('sub') id: number,
    @GetCurrentUser('refreshToken') token: string,
  ) {
    this.authService.refreshToken(id, token);
  }
}
