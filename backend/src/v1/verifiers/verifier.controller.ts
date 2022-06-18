import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { LoginResponseDto } from '../users/dtos/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateVerifierDto } from './dtos/create-verifier.dto';
import { LoginResponseVerifierDto } from './dtos/login-response-verifier.dto';
import { LoginDto } from './dtos/login.dto';

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

    const token = this.jwtService.sign({ id: validVerifier.id, username: validVerifier.username });
    return new LoginResponseDto(token, validVerifier.id);
  }
}
