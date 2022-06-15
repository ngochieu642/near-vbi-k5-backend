import { Controller } from '@nestjs/common';
import { IdentityRequestsService } from './identity-requests.service';

@Controller('identity-requests')
export class IdentityRequestsController {
  constructor(private identityRequestsService: IdentityRequestsService) {}
}
