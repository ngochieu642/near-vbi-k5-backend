import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AutomapperUserProfile } from './v1/shared/AutomapperUserProfile';
import { UsersModule } from './v1/users/users.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [AutomapperUserProfile],
})
export class AppModule {}
