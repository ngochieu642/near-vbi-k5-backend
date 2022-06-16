import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityRequestsController } from './identity-requests.controller';
import { IdentityRequestsService } from './identity-requests.service';
import { IdentityRequest } from './identity-requests.entity';
import { UserJwtStrategy } from '../users/user.jwt.strategy';
import { VerifierJwtStrategy } from '../verifiers/verifier.jwt.strategy';
import { UsersModule } from '../users/users.module';
import { VerifiersModule } from '../verifiers/verifiers.module';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityRequest]), UsersModule, VerifiersModule],
  controllers: [IdentityRequestsController],
  providers: [IdentityRequestsService, UserJwtStrategy, VerifierJwtStrategy],
  exports: [IdentityRequestsService],
})
export class IdentityRequestsModule {}
