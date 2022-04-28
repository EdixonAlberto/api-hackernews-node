import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { DatabaseModule } from './database/database.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, PostsModule, UsersModule, AuthModule]
})
export class AppModule {
  static port: number

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get<string>('PORT')
  }
}
