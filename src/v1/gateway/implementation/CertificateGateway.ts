import { CertificateDto } from '../../domain/dtos/CertificateDto';
import { ICertificateGateway } from '../interfaces/ICertificateGateway';
import { Injectable, Logger } from '@nestjs/common';
import { DataServices } from '../../domain/abstracts/DataServices';
import { CertificateEntity } from '../../domain/entities/CertificateEntity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class CertificateGateway implements ICertificateGateway {
  private readonly logger = new Logger(CertificateGateway.name);
  private readonly dataService: DataServices;

  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    dataService: DataServices,
  ) {
    this.dataService = dataService;
  }

  async getCertificateListAsync(): Promise<CertificateDto[]> {
    const entities: CertificateEntity[] = await this.dataService.certificates.getAll();
    const dtos = entities.map((entity: CertificateEntity) => {
      const dto = this.mapper.map(entity, CertificateEntity, CertificateDto);
      return dto;
    });
    return dtos;
  }
  async getCertificateByIdAsync(id: string): Promise<CertificateDto> {
    throw new Error('Method not implemented.');
  }
}
