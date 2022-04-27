import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindConditions, Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'

import { PostEntity } from '../post.entity'
import { HitsService } from './hits.service'
import { FilterQueryDto } from '../dto'

@Injectable()
export class PostsService {
  private readonly NRO_PAGE_MAX: number = 5
  private readonly TIME_AUTO_REFRESH_MIN: number = 60
  private interval: NodeJS.Timer

  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly hitsService: HitsService,
    private readonly config: ConfigService
  ) {}

  async getAll(filter: FilterQueryDto, nroPage?: number): Promise<PostEntity[]> {
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

  async refresh(): Promise<TRefreshResponse> {
    const hits: THit[] | null = await this.hitsService.getAll()

    // Handle errors first
    if (!hits) throw new InternalServerErrorException('Error getting new hits')
    if (!hits.length) throw new NotFoundException('Hits not found')

    const posts: PostEntity[] = await this.getAll({})

    // Delete all fields to add new posts
    if (posts.length) await this.postRepository.query('DELETE FROM "posts"')

    // Populate database
    const createPostsPromises = hits.map(hit => this.create(hit))
    const postsCreated = await Promise.allSettled(createPostsPromises) // add multiple posts simultaneously

    // Activate automatic updating of the database
    this.autoRefresh()

    return {
      response: 'Refreshed Database',
      message: `Database updated with ${postsCreated.length} new posts`
    }
  }

  private autoRefresh(): void {
    if (!this.interval && this.config.get<TEnv>('NODE_ENV') !== 'test') {
      try {
        this.interval = setInterval(() => this.refresh(), 1000 * 60 * this.TIME_AUTO_REFRESH_MIN)
      } catch (error) {
        clearInterval(this.interval)
        throw error
      }
    }
  }
}
