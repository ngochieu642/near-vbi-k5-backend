import { GenericRepository } from './GenericRepository';
import { CertificateEntity } from '../entities/CertificateEntity';

export abstract class DataServices {
  abstract certificates: GenericRepository<CertificateEntity>;
}
