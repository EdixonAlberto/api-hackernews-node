import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import { PostEntity } from './post.entity';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
