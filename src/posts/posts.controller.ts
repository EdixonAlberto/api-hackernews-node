import { Controller, Delete, Get, Param, Query } from '@nestjs/common'

@Controller('posts')
export class PostsController {
  @Get()
  getPosts(@Query() filter: { items: number; author: string; tags: string }): string {
    filter
    return 'return all posts'
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): string {
    return `removed post ${id}`
  }
}
