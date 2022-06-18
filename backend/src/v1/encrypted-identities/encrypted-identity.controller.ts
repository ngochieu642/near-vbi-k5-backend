import { Controller, Logger } from '@nestjs/common';
import { EncryptedIdentityService } from './encrypted-identity.service';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('identities')
@Controller('identities')
export class EncryptedIdentityController {
  private logger: Logger;

  constructor(private userService: EncryptedIdentityService, private jwtService: JwtService) {
    this.logger = new Logger(EncryptedIdentityController.name);
  }
}
