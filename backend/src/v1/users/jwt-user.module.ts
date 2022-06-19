import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApplicationConstants } from '../../ApplicationConstants';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    JwtModule.register({
      secret: ApplicationConstants.JWT_SECRET_USER,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [
    {
      provide: 'JwtSecretUserService',
      useExisting: JwtService,
    },
  ],
  exports: ['JwtSecretUserService'],
})
export class JwtSecretUserModule {}
