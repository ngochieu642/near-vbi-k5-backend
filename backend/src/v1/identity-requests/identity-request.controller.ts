import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { IdentityRequestService } from './identity-request.service';
import { VerifierJwtAuthGuard } from '../verifiers/verifier.jwt-auth.guard';
import { IdentityRequest } from './identity-request.entity';
import { ApproveRequestDto } from './dtos/approve-request.dto';
import { VerifierService } from '../verifiers/verifier.service';
import { Verifier } from '../verifiers/verifier.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EncryptionService } from '../../shared/encryption/EncryptionService';
import { ApproveRequestResponseDto } from './dtos/approve-request.response.dto';

@ApiTags('identity requests')
@Controller('identity-requests')
export class IdentityRequestController {
  private logger: Logger;

  constructor(
    private identityRequestsService: IdentityRequestService,
    @Inject(forwardRef(() => VerifierService))
    private verifierService: VerifierService,
  ) {
    this.logger = new Logger(IdentityRequestController.name);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(VerifierJwtAuthGuard)
  @Get('/')
  async getAllIdentityRequests(@Req() request: Request, @Query('status') status): Promise<IdentityRequest[]> {
    return this.identityRequestsService.findAllByStatus(status);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(VerifierJwtAuthGuard)
  @Post('/:id/approve')
  async approvedRequest(
    @Req() request,
    @Param('id') id: string,
    @Body() body: ApproveRequestDto,
  ): Promise<ApproveRequestResponseDto> {
    const verifier: Verifier | null = await this.verifierService.findByUsername(request.user.username);

    if (verifier === null) {
      throw new UnauthorizedException();
    }

    const identityRequest: IdentityRequest | null = await this.identityRequestsService.findById(Number(id));

    if (identityRequest === null) {
      throw new NotFoundException('Can not find request with id ' + id);
    }

    const updatedRequest: IdentityRequest = await this.identityRequestsService.update(Number(id), {
      status: body.approve,
    });

    const objectString: string = JSON.stringify(updatedRequest);
    const encryptedData = EncryptionService.encryptData(objectString);

    this.logger.log(encryptedData);

    return new ApproveRequestResponseDto(EncryptionService.getHashObject(''));
  }
}
