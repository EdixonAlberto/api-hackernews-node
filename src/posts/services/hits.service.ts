import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

import { PostEntity } from '../post.entity'
import { MONTH_NAMES } from '../constants'

@Injectable()
export class HitsService {
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<THit[] | null> {
    const obsResponse = this.httpService.get<THNResponse>('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
    const { status, data } = await lastValueFrom(obsResponse)

    return status === 200 && data?.hits ? data.hits : null
  }

  hitToPostEntity(hit: THit): PostEntity {
    const month: string = MONTH_NAMES[new Date(hit.created_at).getMonth()]
    const tag: string = hit._tags[0]

    delete hit._highlightResult
    delete hit._tags

    return {
      ...hit,
      month,
      tag
    }
  }
}
