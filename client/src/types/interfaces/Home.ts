import { ResponseState } from '../ResponseState'
import { PostData } from '../PostData'


export interface HomeState {
  token: string | null
  posts: PostData[] | null
  ResponseState: ResponseState
}
