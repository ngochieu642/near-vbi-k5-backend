import { Controller, Logger } from '@nestjs/common';
import { IdentitiesService } from './identities.service';
import { JwtService } from '@nestjs/jwt';

@Controller('identities')
export class IdentitiesController {
  private logger: Logger;

  constructor(private userService: IdentitiesService, private jwtService: JwtService) {
    this.logger = new Logger(IdentitiesController.name);
  }
}
