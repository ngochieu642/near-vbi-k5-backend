import { Module } from '@nestjs/common';
import { MongooseDataServiceModule } from './mongo/MongooseDataServiceModule';

@Module({
  imports: [MongooseDataServiceModule],
  exports: [MongooseDataServiceModule],
})
export class DataServiceModule {}
