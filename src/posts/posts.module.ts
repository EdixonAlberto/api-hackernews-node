import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: []
})
export class PostsModule {}
