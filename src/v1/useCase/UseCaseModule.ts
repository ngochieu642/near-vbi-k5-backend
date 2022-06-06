/**
 * Register dependencies with Nest JS DI Container
 */
import { Module } from '@nestjs/common';
import { GetAllCertificatesHandler } from './GetAllCertificates/GetAllCertificatesHandler';
import { GatewayModule } from '../gateway/GatewayModule';

@Module({
  imports: [GatewayModule],
  providers: [GetAllCertificatesHandler],
  exports: [GetAllCertificatesHandler],
})
export class UseCaseModule {}
