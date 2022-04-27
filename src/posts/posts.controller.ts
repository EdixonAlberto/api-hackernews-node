import { Controller, Get, Post, Delete, Query, Param, Body } from '@nestjs/common'

import { PostsService } from './posts.service'

// TODO: create DTO
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/page/:nroPage')
  getPostsPaginated(@Param('nroPage') nroPage: number, @Query() filter: TFilter) {
    return this.postsService.getAll(filter, nroPage)
  }

  @Get()
  getPosts(@Query() filter: TFilter) {
    return this.postsService.getAll(filter)
  }

  @Post()
  createPost(@Body() post: any) {
    return this.postsService.create(post)
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.destroy(id)
  }
}
