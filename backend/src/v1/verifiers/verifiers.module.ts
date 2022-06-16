import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifiersController } from './verifiers.controller';
import { VerifiersService } from './verifiers.service';
import { Verifier } from './verifiers.entity';
import { JwtModule } from '@nestjs/jwt';
import { ApplicationConstants } from '../../ApplicationConstants';
import { VerifierJwtStrategy } from './verifier.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Verifier]),
    JwtModule.register({
      secret: ApplicationConstants.JTW_SECRET,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [VerifiersController],
  providers: [VerifiersService, VerifierJwtStrategy],
  exports: [VerifierJwtStrategy],
})
export class VerifiersModule {}
