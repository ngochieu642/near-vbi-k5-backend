import { AutoMap } from '@automapper/classes';

export class CertificateDto {
  @AutoMap()
  id: string;

  @AutoMap()
  rootCertificate: string;

  @AutoMap()
  claimCertificate: string;

  @AutoMap()
  secureKey: string;

  @AutoMap()
  isValid: boolean;
}
