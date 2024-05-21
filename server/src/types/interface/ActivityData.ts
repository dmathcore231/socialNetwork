import { CommentData } from "../CommentData"
import { LikeData } from "../likeData"
import { RepostData } from "../RepostData"
import { ViewsData } from "../ViewsData"

export interface ActivityData {
  comments: CommentData[]
  reposts: RepostData[]
  likes: LikeData[]
  views: ViewsData[]
}
