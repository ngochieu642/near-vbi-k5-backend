import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemConfig } from '../../config/SystemConfig';
import { CertificateModel, CertificateSchema } from './model/CertificateModel';
import { DataServices } from '../../../domain/abstracts/DataServices';
import { MongoDataServices } from './MongoDataServices';

const connectionString = SystemConfig.getMongoConnectionString();

/**
 * Class that register dependencies with Nest DI Container
 */
@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    MongooseModule.forFeature([{ name: CertificateModel.name, schema: CertificateSchema }]),
  ],
  providers: [{ provide: DataServices, useClass: MongoDataServices }],
  exports: [DataServices],
})
export class MongooseDataServiceModule {}
