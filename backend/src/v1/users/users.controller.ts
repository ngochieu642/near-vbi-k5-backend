import { Body, Controller, Get, Logger, Param, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UsersService } from './users.service';
import { CreateIdentityRequestDto } from './dtos/CreateIdentityRequestDto';
import { IdentityRequestsService } from '../identity-requests/identity-requests.service';
import { LoginDto } from './dtos/LoginDto';
import { LoginResponseDto } from './dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {
  private logger: Logger;

  constructor(
    private userService: UsersService,
    private identityRequestService: IdentityRequestsService,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger(UsersController.name);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    const response = await this.userService.create(body.email, body.password);
    this.logger.log(response);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const validUser = await this.userService.validateUser(body.email, body.password);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({ email: body.email, user: validUser.id });
    return new LoginResponseDto(token);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    this.logger.log(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/identity-request')
  async createIdentityRequest(@Request() request, @Body() body: CreateIdentityRequestDto): Promise<void> {
    this.logger.log(request);
    await this.identityRequestService.createFromRequestDto(body);
    this.logger.log(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() request): Promise<any> {
    this.logger.log(request);
    return {
      userId: request.user,
      authenticated: true,
    };
  }
}
