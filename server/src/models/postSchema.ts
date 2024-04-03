import mongoose, { Schema } from 'mongoose'
import { Post } from '../types/interface/Post'

const postSchema: Schema<Post> = new Schema<Post>({
  creationData: {
    _timeStamp: {
      type: Date,
      default: Date.now
    },
    formattedCreationDate: String,
    userDataCreator: Object
  },

  postData: {
    title: String,
    text: String,
    document: String,
    postScope: {
      type: String,
      enum: ['global', 'personal'],
      default: 'global'
    }
  },

  postActivityData: {
    type: Object,
    default: {
      comments: null,
      reposts: null,
      likes: null,
      views: null
    }
  },

  reports: {
    type: Array || null,
    default: null
  }
}, { id: false })

export const PostModel = mongoose.model<Post>('Post', postSchema)
