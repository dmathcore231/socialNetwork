import './style.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchGetPostById, fetchCreateComment } from '../../../redux/postSlice'
import { LinkBack } from '../../../components/LinkBack'
import { Post } from '../../../components/Post'
import { Btn } from '../../../components/Btn'
import { TextArea } from '../../../components/TextArea'
import { Comment } from '../../../components/Comment'

export function CommentsPost(): JSX.Element {
  const id = useParams().id as string
  const dispatch = useAppDispatch()

  const { post } = useAppSelector(state => state.post)

  const [valueComment, setValueComment] = useState<string>('')
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    dispatch(fetchGetPostById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (isSubmit) {
      const formData = new FormData()
      formData.append('textComment', valueComment)
      dispatch(fetchCreateComment({ id, body: formData }))

      setIsSubmit(false)
    }
  }, [isSubmit, id, dispatch, valueComment])

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmit(true)
  }

  return (
    <div className="comments-post">
      <div className="comments-post-header">
        <div className="comments-post__item">
          <LinkBack BackToHome={false} />
        </div>
        <div className="comments-post__item">
          <Btn
            type="button"
            className="btn_primary btn_outline btn_flat"
            onClick={() => console.log("drafts")}
          >
            Drafts
          </Btn>
        </div>
      </div>
      <div className="comments-post-body">
        <div className="comments-post__item">
          {post ? <Post data={post} /> : null}
        </div>
        <div className="comments-post__item">
          <form className="comments-post-form"
            onSubmit={handleSubmitForm}
          >
            <TextArea
              name='comment'
              id='comment'
              maxLength={200}
              minLength={1}
              required={true}
              onChange={e => setValueComment(e.target.value)}
              value={valueComment}
              placeholder="Post your reply"
              className="text-area_padding_size_btn-size"
              btnInTextArea={
                <div className="text-area__btn">
                  <Btn
                    type="submit"
                    className="btn_primary btn_padding_none_vertical"
                    onClick={() => console.log('click')}
                  >
                    Reply
                  </Btn>
                </div>
              }
            />
          </form>
        </div>
      </div>
      <div className="comments-post-footer">
        <div className="comments-post-feed">
          {post && <Comment data={post.postActivityData.comments} />}
        </div>
      </div>
    </div>
  )
}


