import { Injectable, Logger } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentityRequest } from './identity-request.entity';
import { CreateIdentityRequestDto } from '../users/dtos/create-identity-request.dto';
import { User } from '../users/user.entity';
import { IdentityRequestStatus } from '../../shared/type';
import { EncryptionService } from '../../shared/encryption/EncryptionService';
import { ApproveRequestDto } from './dtos/approve-request.dto';
import { EncryptedIdentity } from '../encrypted-identities/encrypted-identity.entity';
import { Verifier } from '../verifiers/verifier.entity';
import { Identity } from '../identities/identity.entity';

@Injectable()
export class IdentityRequestService {
  private logger: Logger;

  constructor(
    @InjectRepository(IdentityRequest) private identityRequestRepository: Repository<IdentityRequest>,
    @InjectRepository(EncryptedIdentity) private encryptedIdentityRepository: Repository<EncryptedIdentity>,
  ) {
    this.logger = new Logger(IdentityRequestService.name);
  }

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

    const identityRequest: IdentityRequest = this.identityRequestRepository.create(partialProperty);
    return this.identityRequestRepository.save(identityRequest);
  }

  async findAllByStatus(status = 'pending'): Promise<IdentityRequest[]> {
    return this.identityRequestRepository.find({ where: { status: status as IdentityRequestStatus } });
  }

  async findById(id: number): Promise<IdentityRequest | null> {
    return this.identityRequestRepository.findOne({ where: { id: id } });
  }

  async update(id: number, attrs: Partial<IdentityRequest>): Promise<IdentityRequest> {
    const identityRequest = await this.findById(id);

    if (!identityRequest) {
      throw new Error('request not found');
    }

    Object.assign(identityRequest, attrs);
    return this.identityRequestRepository.save(identityRequest);
  }

  /**
   * Update Identity Request approved
   * encrypted dữ liệu với public key và lưu ở EncryptedIdentity
   * Return hash for verifier to save on blockchain
   */
  async approveIdentityRequest(identityRequest: IdentityRequest, request: ApproveRequestDto, verifier: Verifier) {
    // Update Identity Request
    const updatedRequest: IdentityRequest = await this.update(Number(identityRequest.id), {
      status: request.approve,
    });

    this.logger.log('Identity Request Updated: ', updatedRequest);

    if (request.approve !== 'approved') {
      return;
    }

    // Construct identity, encrypted it and save
    const identity = new Identity(
      identityRequest.name,
      identityRequest.gender,
      identityRequest.dob,
      identityRequest.address,
      identityRequest.ccid,
      identityRequest.phoneNumber,
      identityRequest.nationality,
      JSON.parse(JSON.stringify(identityRequest.faceVector)),
    );

    this.logger.log('Identity: ', JSON.stringify(identity, null, 2));

    const encryptedData = EncryptionService.encryptData(JSON.stringify(identity));
    this.logger.log('Encrypted Data: ', encryptedData);

    const { publicKey } = EncryptionService.loadKeys();

    //
    const encryptedIdentity = this.encryptedIdentityRepository.create({
      encryptedData: encryptedData,
      user: identityRequest.user,
      verifier: verifier,
      publicKey: publicKey,
    });

    await this.encryptedIdentityRepository.save(encryptedIdentity);

    // Return hash for identity
    return EncryptionService.getHashObject(identity);
  }
}
