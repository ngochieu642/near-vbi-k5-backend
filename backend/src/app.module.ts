import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AutomapperUserProfile } from './shared/AutomapperUserProfile';
import { UserModule } from './v1/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './v1/users/user.entity';
import { IdentityRequest } from './v1/identity-requests/identity-request.entity';
import { Verifier } from './v1/verifiers/verifier.entity';
import { VerifierModule } from './v1/verifiers/verifier.module';
import { Identity } from './v1/identities/identity.entity';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54320,
      username: 'docker',
      password: 'docker',
      database: 'identity_app',
      entities: [User, IdentityRequest, Verifier, Identity],
      synchronize: true,
    }),
    UserModule,
    VerifierModule,
  ],
  controllers: [],
  providers: [AutomapperUserProfile],
})
export class AppModule {}
