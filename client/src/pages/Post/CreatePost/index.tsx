import "./styles.scss"
import { useState, FormEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { fetchCreatePost, resetResponseState } from "../../../redux/postSlice"
import { LinkBack } from "../../../components/LinkBack"
import { Btn } from "../../../components/Btn"
import { Input } from "../../../components/Input"
import { TextArea } from "../../../components/TextArea"
import { defaultFormCreatePost } from "../../../helpers/defaultState"

export function CreatePost(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { status } = useAppSelector(state => state.post.ResponseState)

  const [isSubmit, setIsSubmit] = useState(false)
  const [formCreatePost, setFormCreatePost] = useState(defaultFormCreatePost)

  useEffect(() => {
    return () => {
      dispatch(resetResponseState())
    }
  }, [])

  useEffect(() => {
    if (isSubmit) {
      const formData = new FormData()
      Object.entries(formCreatePost).forEach(([key, value]) => {
        if (value !== null) {
          if (value instanceof FileList) {
            Array.from(value).forEach((file) => {
              formData.append(key, file, file.name)
            })
          } else {
            formData.append(key, value)
          }
        }
      })

      dispatch(fetchCreatePost(formData))
    }
  }, [isSubmit, dispatch])

  useEffect(() => {
    if (status === 201) {
      setFormCreatePost(defaultFormCreatePost)
      navigate(-1)
    }
  }, [status, navigate])


  function handleSubmitModal(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setIsSubmit(true)
    console.log(formCreatePost)
  }

  return (
    <div className="create-post container">
      <div className="create-post-header">
        <div className="create-post-header__item">
          <LinkBack BackToHome={false} />
        </div>
        <div className="create-post-header__item">
          <div className="create-post-header__btn-group">
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
              formId="form-create-post"
            >
              Post
            </Btn>
          </div>
        </div>
      </div>
      <div className="create-post-body">
        <form className="form form-create-post"
          id="form-create-post"
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
      </div>
    </div>
  )
}
