import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UsersService } from './services/users.service'
import { CreateUserDto, LoginUserDto, DeleteUserDto } from './dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAll()
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user)
  }

  @Post('/login')
  loginUser(@Body() login: LoginUserDto) {
    return
  }

  @Delete(':id')
  deleteUser(@Param() { id }: DeleteUserDto) {
    return this.usersService.destroy(id)
  }
}
