import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '../contants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
      ignoreExpiration: true,
      secretOrKey: jwtSecret,
    });
  }
  validate(payload: any) {
    console.log(payload);
    return payload;
  }
}
