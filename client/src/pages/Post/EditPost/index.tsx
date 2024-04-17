import "./styles.scss"
import { useState, FormEvent, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { fetchCreatePost, fetchGetPostById } from "../../../redux/postSlice"
import { LinkBack } from "../../../components/LinkBack"
import { Btn } from "../../../components/Btn"
import { Input } from "../../../components/Input"
import { TextArea } from "../../../components/TextArea"
import { Spinner } from "../../../components/Spinner"
import { defaultFormCreatePost } from "../../../helpers/defaultState"

export function EditPost(): JSX.Element {
  const dispatch = useAppDispatch()
  const postId = useParams().id

  const { post, ResponseState: { loading } } = useAppSelector(state => state.post)

  const [isSubmit, setIsSubmit] = useState(false)
  const [formCreatePost, setFormCreatePost] = useState(defaultFormCreatePost)

  useEffect(() => {
    if (postId) {
      dispatch(fetchGetPostById(postId))
    }
  }, [])

  useEffect(() => {
    if (post) {
      setFormCreatePost({
        title: post.postData.title,
        text: post.postData.text,
        postScope: post.postData.postScope
      })
    }
  }, [post])

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false)
      const formData = new FormData()
      Object.entries(formCreatePost).forEach(([key, value]) => {
        formData.append(key, value)
      })

      dispatch(fetchCreatePost(formData))
    }
  }, [isSubmit, dispatch])

  function handleSubmitModal(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setIsSubmit(true)
  }

  function handleClickBtnCancel() {
    setFormCreatePost({
      title: post!.postData.title,
      text: post!.postData.text,
      postScope: post!.postData.postScope
    })
  }

  return (
    <div className="edit-post container">
      <div className="edit-post-header">
        <div className="edit-post-header__item">
          <LinkBack BackToHome={false} />
        </div>
        <div className="edit-post-header__item">
          <div className="edit-post-header__btn-group">
            <Btn
              type="button"
              className="btn_primary btn_outline btn_flat"
              onClick={handleClickBtnCancel}
            >
              Cancel
            </Btn>
            <Btn
              type="button"
              className="btn_primary btn_outline btn_flat"
              onClick={() => console.log("drafts")}
            >
              Drafts
            </Btn>
            <Btn
              type="submit"
              className={"btn_primary btn_flat"
                + (formCreatePost.title && formCreatePost.text ? "" : " btn_disabled")
              }
              disabled={!formCreatePost.title || !formCreatePost.text}
              formId="form-edit-post"
            >
              Post
            </Btn>
          </div>
        </div>
      </div>
      <div className="edit-post-body">
        {loading
          ? (
            <div className="edit-post-body__spinner">
              <Spinner width="45px" height="45px" />
            </div>
          )
          : (
            <form className="form form-edit-post"
              id="form-edit-post"
              onSubmit={handleSubmitModal}
            >
              <Input
                name="title"
                type="text"
                id="title"
                label={{
                  text: "What's the title?",
                  labelInvisible: true
                }}
                required={true}
                onChange={(e) => setFormCreatePost({ ...formCreatePost, title: e.target.value })}
                value={formCreatePost.title}
                placeholder="Title Post"
                className="input_primary"
              />

              <TextArea
                name="text"
                maxLength={200}
                minLength={1}
                required={true}
                onChange={(e) => setFormCreatePost({ ...formCreatePost, text: e.target.value })}
                value={formCreatePost.text}
                placeholder="What's happening?"
                className="text-area_primary"
              />
            </form>
          )}
      </div>
    </div>
  )
}
