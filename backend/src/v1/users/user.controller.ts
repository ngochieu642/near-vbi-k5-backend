import { Body, Controller, Get, Logger, Param, Post, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { CreateIdentityRequestDto } from './dtos/create-identity-request.dto';
import { IdentityRequestService } from '../identity-requests/identity-request.service';
import { LoginDto } from './dtos/login.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserJwtAuthGuard } from './user.jwt-auth.guard';
import { UserInJwt } from '../../shared/type';
import { User } from './user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  private logger: Logger;

  constructor(
    private userService: UserService,
    private identityRequestService: IdentityRequestService,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger(UserController.name);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    const response = await this.userService.create(body.email, body.password, body.username);
    this.logger.log(response);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const validUser = await this.userService.validateUser(body.username, body.password);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({ email: body.username, user: validUser.id });
    return new LoginResponseDto(token, validUser.id);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('/:id')
  async findUser(@Req() request: Request, @Param('id') id: string) {
    return id;
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(UserJwtAuthGuard)
  @Post('/identity-request')
  async createIdentityRequest(@Req() request: Request, @Body() body: CreateIdentityRequestDto): Promise<void> {
    const userInJwt: UserInJwt = request.user as UserInJwt; // See JwtStrategy
    const user: User = await this.userService.findOne(userInJwt.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.identityRequestService.createFromRequestDto(body, user);
  }
}
