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
import { EncryptedIdentity } from './v1/encrypted-identities/encrypted-identity.entity';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '54.254.178.184',
      port: 54320,
      username: 'docker',
      password: 'docker',
      database: 'identity_app',
      entities: [User, IdentityRequest, Verifier, EncryptedIdentity],
      synchronize: true,
    }),
    UserModule,
    VerifierModule,
  ],
  controllers: [],
  providers: [AutomapperUserProfile],
})
export class AppModule {}
