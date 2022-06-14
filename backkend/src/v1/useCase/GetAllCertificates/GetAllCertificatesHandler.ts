import { CertificateDto } from '../../domain/dtos/CertificateDto';
import { RequestHandler } from '../abstracts/RequestHandler';
import { GetAllCertificatesQuery } from './GetAllCertifficatesQuery';
import { Injectable } from '@nestjs/common';
import { CertificateGateway } from '../../gateway/implementation/CertificateGateway';

@Injectable()
export class GetAllCertificatesHandler implements RequestHandler<GetAllCertificatesQuery, CertificateDto[]> {
  private certificateGateway: CertificateGateway;

  constructor(certificateGateway: CertificateGateway) {
    this.certificateGateway = certificateGateway;
  }

  async handle(request: GetAllCertificatesQuery): Promise<CertificateDto[]> {
    const certificateDtos: CertificateDto[] = await this.certificateGateway.getCertificateListAsync();
    return certificateDtos;
  }
}
