import { AutoMap } from '@automapper/classes';

export class CertificateEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  certificateId: string;

  @AutoMap()
  rootCertificate: string;

  @AutoMap()
  claimCertificate: string;

  @AutoMap()
  secureKey: string;

  @AutoMap()
  isValid: boolean;

  @AutoMap()
  ownershipToken: string;
}
