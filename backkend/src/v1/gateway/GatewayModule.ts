import { Module } from '@nestjs/common';
import { CertificateGateway } from './implementation/CertificateGateway';
import { DataServiceModule } from '../infrastructure/data/DataServiceModule';

@Module({
  imports: [DataServiceModule],
  providers: [CertificateGateway],
  exports: [CertificateGateway],
})
export class GatewayModule {}
