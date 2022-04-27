import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindConditions, Repository } from 'typeorm'

import { PostEntity } from '../post.entity'
import { HitsService } from './hits.service'

@Injectable()
export class PostsService {
  private readonly NRO_PAGE_MAX = 5

  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly hitsService: HitsService
  ) {}

  async getAll(filter: TFilter, nroPage?: number): Promise<PostEntity[]> {
    let where: FindConditions<PostEntity> = {}
    let skip: number
    let take: number

    // Create where
    for (const key in filter) {
      const value = filter[key]
      if (value) where[key] = value
    }

    // Create pagination
    if (nroPage) {
      skip = this.NRO_PAGE_MAX * (nroPage - 1)
      take = this.NRO_PAGE_MAX
    }

    return await this.postRepository.find({ where, skip, take })
  }

  async create(hit: THit): Promise<PostEntity> {
    const newPost: PostEntity = this.hitsService.hitToPostEntity(hit)
    const post: PostEntity = this.postRepository.create(newPost)

    return await this.postRepository.save(post)
  }

  async destroy(postId: string): Promise<PostEntity> {
    const post: PostEntity = await this.postRepository.findOne(postId)

    if (!post) throw new NotFoundException('Post not found')

    return await this.postRepository.remove(post)
  }
}
