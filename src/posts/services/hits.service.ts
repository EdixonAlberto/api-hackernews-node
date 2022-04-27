import { Injectable } from '@nestjs/common'

import { PostEntity } from '../post.entity'

@Injectable()
export class HitsService {
  hitToPostEntity(hit: THit): PostEntity {
    const month = [
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
    ][new Date(hit.created_at).getMonth()]

    const tag = hit._tags[0]

    delete hit._highlightResult
    delete hit._tags

    return {
      ...hit,
      month,
      tag
    }
  }
}
