import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostsModule } from './posts/posts.module'

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true
    })
  ]
})
export class AppModule {}
