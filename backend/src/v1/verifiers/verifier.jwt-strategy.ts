import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApplicationConstants } from '../../ApplicationConstants';
import { VerifierInJwt } from '../../shared/type';

@Injectable()
export class VerifierJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ApplicationConstants.JWT_SECRET_VERIFIER,
    });
  }

  async validate(payload: any): Promise<VerifierInJwt> {
    return { id: payload.id, username: payload.username, roles: ['verifier'] };
  }
}
