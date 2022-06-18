import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';
import { Verifier } from './verifier.entity';
import { JwtModule } from '@nestjs/jwt';
import { ApplicationConstants } from '../../ApplicationConstants';
import { VerifierJwtStrategy } from './verifier.jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Verifier]),
    JwtModule.register({
      secret: ApplicationConstants.JWT_SECRET_VERIFIER,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [VerifierController],
  providers: [VerifierService, VerifierJwtStrategy],
  exports: [VerifierJwtStrategy],
})
export class VerifierModule {}
