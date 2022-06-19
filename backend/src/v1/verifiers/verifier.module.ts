import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';
import { Verifier } from './verifier.entity';
import { VerifierJwtStrategy } from './verifier.jwt-strategy';
import { JwtSecretVerifierModule } from './jwt-verifier.module';

@Module({
  imports: [TypeOrmModule.forFeature([Verifier]), JwtSecretVerifierModule],
  controllers: [VerifierController],
  providers: [VerifierService, VerifierJwtStrategy],
  exports: [VerifierJwtStrategy],
})
export class VerifierModule {}
