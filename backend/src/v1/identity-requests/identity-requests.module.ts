import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityRequestsController } from './identity-requests.controller';
import { IdentityRequestsService } from './identity-requests.service';
import { IdentityRequest } from './identity-requests.entity';
import { VerifierJwtStrategy } from '../verifiers/verifier.jwt.strategy';
import { VerifiersModule } from '../verifiers/verifiers.module';
import { VerifiersService } from '../verifiers/verifiers.service';
import { Verifier } from '../verifiers/verifiers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityRequest, Verifier]), VerifiersModule],
  controllers: [IdentityRequestsController],
  providers: [IdentityRequestsService, VerifierJwtStrategy, VerifiersService],
  exports: [IdentityRequestsService],
})
export class IdentityRequestsModule {}
