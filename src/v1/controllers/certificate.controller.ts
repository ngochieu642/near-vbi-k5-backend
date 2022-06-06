import { Controller, Get, Logger, Param } from '@nestjs/common';
import { V1Constants } from '../V1Constants';
import { CertificateDto } from '../domain/dtos/CertificateDto';
import { GetAllCertificatesHandler } from '../useCase/GetAllCertificates/GetAllCertificatesHandler';
import { GetAllCertificatesQuery } from '../useCase/GetAllCertificates/GetAllCertifficatesQuery';

@Controller(V1Constants.CERTIFICATES_API_PREFIX)
export class CertificateController {
  private static readonly logger = new Logger(CertificateController.name);

  private getAllCertificatesHandler: GetAllCertificatesHandler;

  constructor(getAllCertificatesHandler: GetAllCertificatesHandler) {
    this.getAllCertificatesHandler = getAllCertificatesHandler;
  }

  @Get()
  async getAll(): Promise<CertificateDto[]> {
    const request = new GetAllCertificatesQuery();
    const results: CertificateDto[] = await this.getAllCertificatesHandler.handle(request);
    CertificateController.logger.debug('Found: ' + results.length);
    return results;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<string> {
    return '';
  }
}
