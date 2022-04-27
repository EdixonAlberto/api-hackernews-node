import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostsController } from './posts.controller'
import { PostEntity } from './post.entity'
import { PostsService } from './services/posts.service'
import { HitsService } from './services/hits.service'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [PostsService, HitsService]
})
export class PostsModule {}
