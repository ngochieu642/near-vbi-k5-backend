import { Body, Controller, Get, Logger, Param, Post, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UsersService } from './users.service';
import { CreateIdentityRequestDto } from './dtos/CreateIdentityRequestDto';
import { IdentityRequestsService } from '../identity-requests/identity-requests.service';
import { LoginDto } from './dtos/LoginDto';
import { LoginResponseDto } from './dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserInJwt } from '../../shared/type';

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
    const response = await this.userService.create(body.email, body.password, body.username);
    this.logger.log(response);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const validUser = await this.userService.validateUser(body.email, body.password);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({ email: body.email, user: validUser.id });
    return new LoginResponseDto(token, validUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findUser(@Req() request: Request, @Param('id') id: string) {
    this.logger.log(request.user);
    this.logger.log(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/identity-request')
  async createIdentityRequest(@Req() request: Request, @Body() body: CreateIdentityRequestDto): Promise<void> {
    const user: UserInJwt = request.user as UserInJwt; // See JwtStrategy
    this.logger.log(user);
    this.logger.log(body);
    await this.identityRequestService.createFromRequestDto(body);
  }
}
