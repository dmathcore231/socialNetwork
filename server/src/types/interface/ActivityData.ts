import { CommentData } from "../commentData"
import { LikeData } from "../likeData"
import { RepostData } from "../RepostData"
import { ViewsData } from "../viewsData"

export interface ActivityData {
  comments: CommentData[] | null
  reposts: RepostData[] | null
  likes: LikeData[] | null
  views: ViewsData[] | null
}
