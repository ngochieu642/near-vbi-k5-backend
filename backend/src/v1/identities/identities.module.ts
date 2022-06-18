import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentitiesController } from './identities.controller';
import { IdentitiesService } from './identities.service';
import { Identity } from './identities.entity';
import { IdentityRequestModule } from '../identity-requests/identity-request.module';
import { JwtModule } from '@nestjs/jwt';
import { ApplicationConstants } from '../../ApplicationConstants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Identity]),
    IdentityRequestModule,
    JwtModule.register({
      secret: ApplicationConstants.JWT_SECRET_USER,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [IdentitiesController],
  providers: [IdentitiesService],
  exports: [],
})
export class IdentitiesModule {}
