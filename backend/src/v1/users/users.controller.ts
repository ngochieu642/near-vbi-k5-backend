import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UsersService } from './users.service';
import { CreateIdentityRequestDto } from './dtos/CreateIdentityRequestDto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    const response = await this.userService.create(body.email, body.password);
    console.log(response);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log(id);
  }

  @Post('/identity-request')
  async createIdentityRequest(@Body() body: CreateIdentityRequestDto): Promise<void> {
    console.log(body);
  }
}
