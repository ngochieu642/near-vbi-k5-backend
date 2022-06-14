import { CertificateDto } from '../../domain/dtos/CertificateDto';

export interface ICertificateGateway {
  getCertificateListAsync(): Promise<CertificateDto[]>;
  getCertificateByIdAsync(id: string): Promise<CertificateDto>;
}
