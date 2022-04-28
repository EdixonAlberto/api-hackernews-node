import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../user.entity'
import { CreateUserDto, UserDto } from '../dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async getAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find()

    return users.map(user => new UserDto(user))
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email }
    })
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser: UserEntity = this.userRepository.create(user)

    return await this.userRepository.save(newUser)
  }

  async destroy(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne(id)

    if (!user) throw new NotFoundException('User not found')

    return await this.userRepository.remove(user)
  }
}
