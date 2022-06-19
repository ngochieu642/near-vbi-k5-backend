import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApplicationConstants } from '../../ApplicationConstants';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    JwtModule.register({
      secret: ApplicationConstants.JWT_SECRET_VERIFIER,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  providers: [
    {
      provide: 'JwtSecretVerifierService',
      useExisting: JwtService,
    },
  ],
  exports: ['JwtSecretVerifierService'],
})
export class JwtSecretVerifierModule {}
