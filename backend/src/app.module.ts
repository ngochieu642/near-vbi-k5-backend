import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AutomapperUserProfile } from './shared/AutomapperUserProfile';
import { UserModule } from './v1/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './v1/users/user.entity';
import { IdentityRequest } from './v1/identity-requests/identity-requests.entity';
import { Verifier } from './v1/verifiers/verifiers.entity';
import { VerifiersModule } from './v1/verifiers/verifiers.module';

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
      entities: [User, IdentityRequest, Verifier],
      synchronize: true,
    }),
    UserModule,
    VerifiersModule,
  ],
  controllers: [],
  providers: [AutomapperUserProfile],
})
export class AppModule {}
