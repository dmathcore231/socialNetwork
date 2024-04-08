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
  comments: CommentData[] | null
  reposts: RepostData[] | null
  likes: LikeData[] | null
  views: ViewsData[] | null
}
