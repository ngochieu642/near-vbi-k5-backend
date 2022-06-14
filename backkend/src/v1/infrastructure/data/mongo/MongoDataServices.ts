import { DataServices } from '../../../domain/abstracts/DataServices';
import { MongoGenericRepository } from './MongoGenericRepository';
import { Model } from 'mongoose';
import { CertificateDocument, CertificateModel } from './model/CertificateModel';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class MongoDataServices implements DataServices, OnApplicationBootstrap {
  certificates: MongoGenericRepository<CertificateModel>;
  private readonly certificateRepository: Model<CertificateDocument>;

  constructor(
    @InjectModel(CertificateModel.name)
    certificateRepository: Model<CertificateDocument>,
  ) {
    this.certificateRepository = certificateRepository;
  }

  onApplicationBootstrap(): void {
    this.certificates = new MongoGenericRepository<CertificateModel>(this.certificateRepository, []);
  }
}
