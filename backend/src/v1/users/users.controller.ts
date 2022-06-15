import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UsersService } from './users.service';
import { CreateIdentityRequestDto } from './dtos/CreateIdentityRequestDto';

@Controller('users')
export class UsersController {
  private logger: Logger;

  constructor(private userService: UsersService) {
    this.logger = new Logger(UsersController.name);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    const response = await this.userService.create(body.email, body.password);
    this.logger.log(response);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    this.logger.log(id);
  }

  @Post('/identity-request')
  async createIdentityRequest(@Body() body: CreateIdentityRequestDto): Promise<void> {
    this.logger.log(body);
  }
}
