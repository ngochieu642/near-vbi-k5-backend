import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IdentityRequestModule } from '../identity-requests/identity-request.module';
import { UserJwtStrategy } from './user.jwt-strategy';
import { JwtSecretUserModule } from './jwt-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), IdentityRequestModule, JwtSecretUserModule],
  controllers: [UserController],
  providers: [UserService, UserJwtStrategy],
  exports: [UserJwtStrategy],
})
export class UserModule {}
