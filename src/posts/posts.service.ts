import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindConditions, Repository } from 'typeorm'

import { PostEntity } from './post.entity'

@Injectable()
export class PostsService {
  private readonly NRO_PAGE_MAX = 5

  constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>) {}

  async getAll(filter: TFilter, nroPage?: number): Promise<PostEntity[]> {
    let where: FindConditions<PostEntity> = {}
    let skip: number
    let take: number

    for (const key in filter) {
      const value = filter[key]
      if (value) where[key] = value
    }

    if (nroPage) {
      skip = this.NRO_PAGE_MAX * (nroPage - 1)
      take = this.NRO_PAGE_MAX
    }

    return await this.postRepository.find({ where, skip, take })
  }

  async create(newPost: PostEntity): Promise<PostEntity> {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    newPost = {
      ...newPost,
      month: monthNames[new Date(newPost.created_at).getMonth()]
    }

    const post: PostEntity = this.postRepository.create(newPost)
    return await this.postRepository.save(post)
  }

  async destroy(postId: string): Promise<PostEntity> {
    const post: PostEntity = await this.postRepository.findOne(postId)

    if (!post) throw new NotFoundException('Post not found')

    return await this.postRepository.remove(post)
  }
}
