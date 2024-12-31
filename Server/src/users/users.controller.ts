import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UserInfo } from './entities/userInfo.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserInfo> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<UserInfo[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('user/:id')
  async getUser(@Param('id') id: number): Promise<UserInfo> {
    return await this.usersService.getUserById(id);
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
