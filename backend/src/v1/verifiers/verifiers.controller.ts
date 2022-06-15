import { Controller } from '@nestjs/common';
import { VerifiersService } from './verifiers.service';

@Controller('verifiers')
export class VerifiersController {
  constructor(private verifiersService: VerifiersService) {}
}
