import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityRequestsController } from './identity-requests.controller';
import { IdentityRequestsService } from './identity-requests.service';
import { IdentityRequest } from './identity-requests.entity';
import { VerifierJwtStrategy } from '../verifiers/verifier.jwt.strategy';
import { VerifiersModule } from '../verifiers/verifiers.module';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityRequest]), VerifiersModule],
  controllers: [IdentityRequestsController],
  providers: [IdentityRequestsService, VerifierJwtStrategy],
  exports: [IdentityRequestsService],
})
export class IdentityRequestsModule {}
