import { Body, Controller, Get, Logger, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { IdentityRequestsService } from './identity-requests.service';
import { VerifierJwtAuthGuard } from '../verifiers/verifier-jwt-auth.guard';
import { IdentityRequest } from './identity-requests.entity';
import { ApproveRequestDto } from './dtos/ApproveRequestDto';

@Controller('identity-requests')
export class IdentityRequestsController {
  private logger: Logger;

  constructor(private identityRequestsService: IdentityRequestsService) {
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
    this.logger.log(request.user);
    this.logger.log(id);
    this.logger.log(body);
  }
}
