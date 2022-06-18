import { Controller, Logger } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('identities')
@Controller('identities')
export class IdentityController {
  private logger: Logger;

  constructor(private userService: IdentityService, private jwtService: JwtService) {
    this.logger = new Logger(IdentityController.name);
  }
}
