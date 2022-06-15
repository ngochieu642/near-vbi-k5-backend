import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifiersController } from './verifiers.controller';
import { VerifiersService } from './verifiers.service';
import { Verifier } from './verifiers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verifier])],
  controllers: [VerifiersController],
  providers: [VerifiersService],
})
export class VerifiersModule {}
