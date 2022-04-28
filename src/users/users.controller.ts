import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { UsersService } from './services/users.service'
import { CreateUserDto, DeleteUserDto } from './dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUsers() {
    return this.usersService.getAll()
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param() { id }: DeleteUserDto) {
    return this.usersService.destroy(id)
  }
}
