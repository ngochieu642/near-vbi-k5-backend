import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { CertificateModel } from '../infrastructure/data/mongo/model/CertificateModel';
import { Injectable } from '@nestjs/common';
import { CertificateDto } from '../domain/dtos/CertificateDto';
import { CertificateEntity } from '../domain/entities/CertificateEntity';

@Injectable()
export class AutomapperUserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, CertificateModel, CertificateEntity);
      createMap(mapper, CertificateEntity, CertificateDto);
    };
  }
}
