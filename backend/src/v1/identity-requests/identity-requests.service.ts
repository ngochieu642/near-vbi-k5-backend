import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentityRequest } from './identity-requests.entity';

@Injectable()
export class IdentityRequestsService {
  constructor(@InjectRepository(IdentityRequest) private repo: Repository<IdentityRequest>) {}
}
