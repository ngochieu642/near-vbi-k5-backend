import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApplicationConstants } from '../../ApplicationConstants';
import { UserInJwt } from '../../shared/type';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ApplicationConstants.JWT_SECRET_USER,
    });
  }

  async validate(payload: any): Promise<UserInJwt> {
    return { id: payload.user, email: payload.email, roles: [] };
  }
}
