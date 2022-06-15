import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApplicationConstants } from '../../ApplicationConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ApplicationConstants.JTW_SECRET,
    });
  }

  async validate(payload: any) {
    return { user: payload.user, email: payload.email };
  }
}
