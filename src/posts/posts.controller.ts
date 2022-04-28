import { Controller, Get, Post, Delete, Query, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { PostsService } from './services/posts.service'
import { FilterQueryDto, ParamPageDto, ParamPostDto } from './dto'

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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

  @Post('/refresh')
  refresh() {
    return this.postsService.refresh()
  }

  @Delete(':id')
  deletePost(@Param() { id }: ParamPostDto) {
    return this.postsService.destroy(id)
  }
}
