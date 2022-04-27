import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'

import { PostsController } from './posts.controller'
import { PostEntity } from './post.entity'
import { PostsService } from './services/posts.service'
import { HitsService } from './services/hits.service'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), HttpModule],
  controllers: [PostsController],
  providers: [PostsService, HitsService]
})
export class PostsModule {}
