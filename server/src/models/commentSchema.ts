import mongoose, { Schema } from 'mongoose'
import { CommentData } from '../types/CommentData'

export const commentsSchema: Schema = new Schema<CommentData>({
  _postId: String,
  _timestamp: Number,
  userDataCreator: {
    type: {
      _id: String,
      _role: String,
      fullName: String,
      tag: String,
      userAvatar: String || null
    }
  },
  formattedDate: String,
  text: String,
  likes: {
    type: [
      {
        _timestamp: Number,
        _postId: String,
        userDataCreator: {
          type: {
            _id: String,
            _role: String,
            fullName: String,
            tag: String,
            userAvatar: String || null
          }
        }
      }
    ],
    default: []
  },
  reports: Array
})

export const CommentModel = mongoose.model<CommentData>('Comment', commentsSchema)
