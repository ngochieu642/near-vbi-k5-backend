import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { LoginResponseDto } from '../users/dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import { CreateVerifierDto } from './dtos/CreateVerifierDto';
import { LoginResponseVerifierDto } from './dtos/LoginResponseVerifierDto';
import { LoginDto } from './dtos/LoginDto';

@Controller('verifiers')
export class VerifierController {
  private logger: Logger;
  constructor(private verifiersService: VerifierService, private jwtService: JwtService) {
    this.logger = new Logger(VerifierController.name);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateVerifierDto): Promise<void> {
    const response = await this.verifiersService.create(body.username, body.password);
    this.logger.log(response);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<LoginResponseVerifierDto> {
    const validVerifier = await this.verifiersService.validateUser(body.username, body.password);

    if (!validVerifier) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({ id: validVerifier.id, username: validVerifier.username});
    return new LoginResponseDto(token, validVerifier.id);
  }
}
