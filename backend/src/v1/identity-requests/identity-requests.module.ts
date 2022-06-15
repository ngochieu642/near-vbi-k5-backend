import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityRequestsController } from './identity-requests.controller';
import { IdentityRequestsService } from './identity-requests.service';
import { IdentityRequest } from './identity-requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityRequest])],
  controllers: [IdentityRequestsController],
  providers: [IdentityRequestsService],
  exports: [IdentityRequestsService],
})
export class IdentityRequestsModule {}
