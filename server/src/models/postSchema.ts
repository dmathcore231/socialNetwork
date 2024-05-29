import mongoose, { Schema } from 'mongoose'
import { Post } from '../types/interface/Post'

const postSchema: Schema<Post> = new Schema<Post>({
  creationData: {
    _timeStamp: {
      type: Date,
      default: Date.now
    },
    formattedCreationDate: String,
    userDataCreator: {
      type: {
        _id: String,
        _role: String,
        fullName: String,
        tag: String,
        userAvatar: String || null
      }
    }
  },

  postData: {
    title: String,
    text: String,
    document: Array || null,
    postScope: {
      type: String,
      enum: ['global', 'personal'],
      default: 'global'
    }
  },

  postActivityData: {
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
      default: []
    },

    likes: {
      type: [{
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
      }],
      default: []
    },
    reposts: {
      type: [{
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
      }],
      default: []
    },
    views: {
      type: [{
        _timeStamp: Number,
        userDataCreator: {
          type: {
            _id: String,
            _role: String,
            fullName: String,
            tag: String,
            userAvatar: String || null
          }
        }
      }],
      default: []
    },
  },

  reports: {
    type: Array || null,
    default: null
  }
}, { id: false })

export const PostModel = mongoose.model<Post>('Post', postSchema)
