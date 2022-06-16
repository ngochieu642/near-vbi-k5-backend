import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { IdentityRequestsModule } from '../identity-requests/identity-requests.module';
import { JwtModule } from '@nestjs/jwt';
import { ApplicationConstants } from '../../ApplicationConstants';
import { UserJwtStrategy } from './user.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    IdentityRequestsModule,
    JwtModule.register({
      secret: ApplicationConstants.JTW_SECRET,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserJwtStrategy],
})
export class UsersModule {}
