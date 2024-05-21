import { ResponseState } from '../ResponseState'
import { CommentData } from '../CommentData'
import { RepostData } from '../RepostData'
import { LikeData } from '../likeData'
import { ViewsData } from '../ViewsData'
import { PostData } from '../PostData'

export interface PostState {
  post: PostData | null
  ResponseState: ResponseState
}

export interface ActivityData {
  comments: CommentData[]
  reposts: RepostData[]
  likes: LikeData[]
  views: ViewsData[]
}
