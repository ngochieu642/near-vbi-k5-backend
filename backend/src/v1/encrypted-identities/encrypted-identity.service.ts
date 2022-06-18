import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Identity } from './encrypted-identity.entity';

@Injectable()
export class EncryptedIdentityService {
  constructor(@InjectRepository(Identity) private repo: Repository<Identity>) {}

  findOne(id: number): Promise<Identity> {
    return this.repo.findOne({ where: { id: id } });
  }

  async update(id: number, attrs: Partial<Identity>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, attrs);
    await this.repo.save(user);
  }

  async remove(id: number): Promise<Identity> {
    const identity = await this.findOne(id);
    if (!identity) {
      throw new Error('Identity not found');
    }

    return this.repo.remove(identity);
  }
}
