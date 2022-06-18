import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityRequestController } from './identity-request.controller';
import { IdentityRequestService } from './identity-request.service';
import { IdentityRequest } from './identity-request.entity';
import { VerifierJwtStrategy } from '../verifiers/verifier.jwt-strategy';
import { VerifierModule } from '../verifiers/verifier.module';
import { VerifierService } from '../verifiers/verifier.service';
import { Verifier } from '../verifiers/verifier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityRequest, Verifier]), VerifierModule],
  controllers: [IdentityRequestController],
  providers: [IdentityRequestService, VerifierJwtStrategy, VerifierService],
  exports: [IdentityRequestService],
})
export class IdentityRequestModule {}
