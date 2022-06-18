import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityRequestsController } from './identity-requests.controller';
import { IdentityRequestsService } from './identity-requests.service';
import { IdentityRequest } from './identity-requests.entity';
import { VerifierJwtStrategy } from '../verifiers/verifier.jwt-strategy';
import { VerifierModule } from '../verifiers/verifier.module';
import { VerifierService } from '../verifiers/verifier.service';
import { Verifier } from '../verifiers/verifier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityRequest, Verifier]), VerifierModule],
  controllers: [IdentityRequestsController],
  providers: [IdentityRequestsService, VerifierJwtStrategy, VerifierService],
  exports: [IdentityRequestsService],
})
export class IdentityRequestsModule {}
