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
import { IdentityRequestsService } from './identity-requests.service';
import { VerifierJwtAuthGuard } from '../verifiers/verifier-jwt-auth.guard';
import { IdentityRequest } from './identity-requests.entity';
import { ApproveRequestDto } from './dtos/ApproveRequestDto';
import { VerifiersService } from '../verifiers/verifiers.service';
import { Verifier } from '../verifiers/verifiers.entity';

@Controller('identity-requests')
export class IdentityRequestsController {
  private logger: Logger;

  constructor(
    private identityRequestsService: IdentityRequestsService,
    @Inject(forwardRef(() => VerifiersService))
    private verifierService: VerifiersService,
  ) {
    this.logger = new Logger(IdentityRequestsController.name);
  }

  @UseGuards(VerifierJwtAuthGuard)
  @Get('/')
  async getAllIdentityRequests(@Req() request: Request, @Query('status') status): Promise<IdentityRequest[]> {
    return this.identityRequestsService.findAllByStatus(status);
  }

  @UseGuards(VerifierJwtAuthGuard)
  @Post('/:id/approve')
  async approvedRequest(@Req() request, @Param('id') id: string, @Body() body: ApproveRequestDto) {
    const verifier: Verifier | null = await this.verifierService.findByUsername(request.user.username);

    if (verifier === null) {
      throw new UnauthorizedException();
    }

    const identityRequest: IdentityRequest | null = await this.identityRequestsService.findById(Number(id));

    if (identityRequest === null) {
      throw new NotFoundException('Can not find request with id ' + id);
    }

    const updatedRequest = this.identityRequestsService.update(Number(id), { status: body.approve });
    return updatedRequest;
  }
}
