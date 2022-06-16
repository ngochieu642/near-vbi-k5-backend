import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Verifier } from './verifiers.entity';

@Injectable()
export class VerifiersService {
  constructor(@InjectRepository(Verifier) private repo: Repository<Verifier>) {}

  async create(username: string, password: string) {
    const user: Verifier = this.repo.create({ password, username: username });
    return this.repo.save(user);
  }

  async validateUser(username: string, password: string): Promise<Verifier | null> {
    const user = await this.findByUsername(username);

    if (!user) {
      return null;
    }

    // Check password
    if (password == user.password) {
      return user;
    }

    return null;
  }

  private async findByUsername(username: string): Promise<Verifier | null> {
    return this.repo.findOne({ where: { username: username} });
  }
}
