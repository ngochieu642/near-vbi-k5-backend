import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, username: string): Promise<User> {
    const user: User = this.repo.create({ email, password, username: username });
    return this.repo.save(user);
  }

  findOne(id: number): Promise<User> {
    return this.repo.findOne({ where: { id: id } });
  }

  find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email: email } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email: email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, attrs);
    this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    return this.repo.remove(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    // Check password
    if (password == user.password) {
      return user;
    }

    return null;
  }
}
