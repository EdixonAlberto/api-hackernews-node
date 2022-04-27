import { Controller, Get, Post, Delete, Query, Param, Body } from '@nestjs/common'

import { PostsService } from './services/posts.service'
import { FilterQueryDto, ParamPageDto, ParamPostDto } from './dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/page/:nroPage')
  getPostsByPage(@Param() { nroPage }: ParamPageDto, @Query() filter: FilterQueryDto) {
    return this.postsService.getAll(filter, nroPage)
  }

  @Get()
  getPosts(@Query() filter: FilterQueryDto) {
    return this.postsService.getAll(filter)
  }

  // TODO: Remove this later
  @Post()
  createPost(@Body() hit: THit) {
    return this.postsService.create(hit)
  }

  @Delete(':id')
  deletePost(@Param() { id }: ParamPostDto) {
    return this.postsService.destroy(id)
  }
}
