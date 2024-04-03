import { ResponseState } from '../ResponseState'
import { CommentData } from '../CommentData'
import { RepostData } from '../RepostData'
import { LikeData } from '../likeData'
import { ViewsData } from '../ViewsData'

export interface PostState {
  ResponseState: ResponseState
}

export interface ActivityData {
  comments: CommentData[] | null
  reposts: RepostData[] | null
  likes: LikeData[] | null
  views: ViewsData[] | null
}
