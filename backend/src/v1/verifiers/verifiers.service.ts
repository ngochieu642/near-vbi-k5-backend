import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Verifier } from './verifiers.entity';

@Injectable()
export class VerifiersService {
  constructor(@InjectRepository(Verifier) private repo: Repository<Verifier>) {}
}
