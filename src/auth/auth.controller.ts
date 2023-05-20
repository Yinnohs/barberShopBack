import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto, SingInDto } from './dto';
import { Tokens } from './types';
import {
  RtGuard,
  createAdminClaim,
  createBarberClaim,
  userDataResource,
} from 'src/common';
import { GetCurrentUser, IsPublicRoute } from 'src/common/decorators';
import { UseRoles } from 'nest-access-control';

@Controller('/api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublicRoute()
  @HttpCode(HttpStatus.CREATED)
  @Post('/local/signup')
  async signupLocal(@Body() singUpDto: SingUpDto): Promise<Tokens> {
    return await this.authService.signupLocal(singUpDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseRoles({
    resource: createAdminClaim,
    action: 'create',
    possession: 'any',
  })
  @Post('/local/signup/barber')
  async signupBarberLocal(@Body() singUpDto: SingUpDto): Promise<Tokens> {
    return await this.authService.signupBarberLocal(singUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseRoles({
    resource: createBarberClaim,
    action: 'create',
    possession: 'any',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/local/signup/admin')
  async signupAdminLocal(@Body() singUpDto: SingUpDto): Promise<Tokens> {
    return await this.authService.signupAdminLocal(singUpDto);
  }

  @IsPublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('/local/signin')
  async signinLocal(@Body() singInDto: SingInDto) {
    return this.authService.signinLocal(singInDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseRoles({
    resource: userDataResource,
    action: 'update',
    possession: 'own',
  })
  @Post('/logout')
  async logout(@GetCurrentUser('sub') id: number) {
    return this.authService.logout(id);
  }

  @IsPublicRoute()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refreshToken(
    @GetCurrentUser('sub') id: number,
    @GetCurrentUser('refreshToken') token: string,
  ) {
    return this.authService.refreshToken(id, token);
  }

  @IsPublicRoute()
  @Get('/')
  async getHealth() {
    return { message: 'is online' };
  }
}
