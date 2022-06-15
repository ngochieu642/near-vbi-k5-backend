import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { IdentityRequestsModule } from '../identity-requests/identity-requests.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), IdentityRequestsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
