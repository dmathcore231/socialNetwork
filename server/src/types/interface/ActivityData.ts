import { CommentData } from "../CommentData"
import { LikeData } from "../likeData"
import { RepostData } from "../RepostData"
import { ViewsData } from "../ViewsData"

export interface ActivityData {
  comments: CommentData[] | null
  reposts: RepostData[] | null
  likes: LikeData[] | null
  views: ViewsData[] | null
}
