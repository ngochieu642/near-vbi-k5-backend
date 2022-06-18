import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptedIdentity } from './encrypted-identity.entity';

@Injectable()
export class EncryptedIdentityService {
  constructor(@InjectRepository(EncryptedIdentity) private repo: Repository<EncryptedIdentity>) {}

  findOne(id: number): Promise<EncryptedIdentity> {
    return this.repo.findOne({ where: { id: id } });
  }

  async update(id: number, attrs: Partial<EncryptedIdentity>) {
    const identity = await this.findOne(id);

    if (!identity) {
      throw new Error('Identity not found');
    }

    Object.assign(identity, attrs);
    await this.repo.save(identity);
  }

  async remove(id: number): Promise<EncryptedIdentity> {
    const identity = await this.findOne(id);
    if (!identity) {
      throw new Error('Identity not found');
    }

    return this.repo.remove(identity);
  }
}
