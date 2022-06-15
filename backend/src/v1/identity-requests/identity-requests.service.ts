import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentityRequest } from './identity-requests.entity';
import { CreateIdentityRequestDto } from '../users/dtos/CreateIdentityRequestDto';

@Injectable()
export class IdentityRequestsService {
  constructor(@InjectRepository(IdentityRequest) private repo: Repository<IdentityRequest>) {}

  createFromRequestDto(dto: CreateIdentityRequestDto): Promise<IdentityRequest> {
    const partialProperty: DeepPartial<IdentityRequest> = {
      accountId: dto.accountId,
      userPublicKey: dto.userPublicKey,
      name: dto.name,
      gender: dto.gender,
      dob: Date.parse(dto.dob),
      address: dto.address,
      ccid: dto.ccid,
      phoneNumber: dto.phoneNumber,
      nationality: dto.nationality,
      faceVector: dto.faceVector,
      status: 'pending',
    };

    const identityRequest: IdentityRequest = this.repo.create(partialProperty);
    return this.repo.save(identityRequest);
  }
}
