import { Injectable } from '@nestjs/common'

import { PostEntity } from '../post.entity'
import { MONTH_NAMES } from '../constants'

@Injectable()
export class HitsService {
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
