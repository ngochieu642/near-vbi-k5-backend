import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { IdentityRequestsService } from './identity-requests.service';
import { VerifierJwtAuthGuard } from '../verifiers/verifier-jwt-auth.guard';
import { IdentityRequest } from './identity-requests.entity';

@Controller('identity-requests')
export class IdentityRequestsController {
  constructor(private identityRequestsService: IdentityRequestsService) {}

  @UseGuards(VerifierJwtAuthGuard)
  @Get('/identity-requests')
  async getAllIdentityRequests(@Req() request: Request, @Query('status') status): Promise<IdentityRequest[]> {
    return this.identityRequestsService.findAllByStatus(status);
  }
}
