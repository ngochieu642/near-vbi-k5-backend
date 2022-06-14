import { Module } from '@nestjs/common';
import { CertificateController } from './v1/controllers/certificate.controller';
import { AppController } from './v1/controllers/app.controller';
import { UseCaseModule } from './v1/useCase/UseCaseModule';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AutomapperUserProfile } from './v1/shared/AutomapperUserProfile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UseCaseModule,
  ],
  controllers: [AppController, CertificateController],
  providers: [AutomapperUserProfile],
})
export class AppModule {}
