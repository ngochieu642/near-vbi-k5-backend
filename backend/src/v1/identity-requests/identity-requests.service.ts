import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentityRequest } from './identity-requests.entity';
import { CreateIdentityRequestDto } from '../users/dtos/CreateIdentityRequestDto';
import { User } from '../users/user.entity';
import { IdentityRequestStatus } from '../../shared/type';

@Injectable()
export class IdentityRequestsService {
  constructor(@InjectRepository(IdentityRequest) private repo: Repository<IdentityRequest>) {}

  createFromRequestDto(dto: CreateIdentityRequestDto, user: User): Promise<IdentityRequest> {
    const partialProperty: DeepPartial<IdentityRequest> = {
      accountId: dto.accountId,
      userPublicKey: dto.userPublicKey,
      name: dto.name,
      gender: dto.gender,
      dob: new Date(dto.dob),
      address: dto.address,
      ccid: dto.ccid,
      phoneNumber: dto.phoneNumber,
      nationality: dto.nationality,
      faceVector: dto.faceVector,
      status: 'pending',
      user: user,
    };

    const identityRequest: IdentityRequest = this.repo.create(partialProperty);
    return this.repo.save(identityRequest);
  }

  async findAllByStatus(status = 'pending'): Promise<IdentityRequest[]> {
    return this.repo.find({ where: { status: status as IdentityRequestStatus } });
  }

  async findById(id: number): Promise<IdentityRequest | null> {
    return this.repo.findOne({ where: { id: id } });
  }
  async update(id: number, attrs: Partial<IdentityRequest>): Promise<IdentityRequest> {
    const identityRequest = await this.findById(id);

    if (!identityRequest) {
      throw new Error('request not found');
    }

    Object.assign(identityRequest, attrs);
    return this.repo.save(identityRequest);
  }
}
