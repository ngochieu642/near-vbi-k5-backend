import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptedIdentityController } from './encrypted-identity.controller';
import { EncryptedIdentityService } from './encrypted-identity.service';
import { Identity } from './encrypted-identity.entity';
import { IdentityRequestModule } from '../identity-requests/identity-request.module';
import { JwtModule } from '@nestjs/jwt';
import { ApplicationConstants } from '../../ApplicationConstants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Identity]),
    IdentityRequestModule,
    JwtModule.register({
      secret: ApplicationConstants.JWT_SECRET_USER,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [EncryptedIdentityController],
  providers: [EncryptedIdentityService],
  exports: [],
})
export class EncryptedIdentityModule {}
