import "./styles.scss"
import { useState, FormEvent, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { fetchGetPostById, fetchEditPost, resetResponseState } from "../../../redux/postSlice"
import { LinkBack } from "../../../components/LinkBack"
import { Btn } from "../../../components/Btn"
import { Input } from "../../../components/Input"
import { InputFile } from "../../../components/InputFile"
import { TextArea } from "../../../components/TextArea"
import { Spinner } from "../../../components/Spinner"
import { Carousel } from "../../../components/Carousel"
import { defaultFormUpdatePost } from "../../../helpers/defaultState"
import { MAX_FILES_IN_POST } from "../../../helpers"

export function EditPost(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const postId = useParams().id

  const { post, ResponseState: { loading, status } } = useAppSelector(state => state.post)

  const [isSubmit, setIsSubmit] = useState(false)
  const [formUpdatePost, setFormUpdatePost] = useState(defaultFormUpdatePost)
  const [updateFiles, setUpdateFiles] = useState<FileList | null>(null)
  const [postDeleteDocument, setPostDeleteDocument] = useState<string | null>(null)
  const [updateDocumentUrls, setUpdateDocumentUrls] = useState<string[] | null>(null)

  useEffect(() => {
    if (postId) {
      dispatch(fetchGetPostById(postId))
    }
  }, [])

  useEffect(() => {
    if (post) {
      setFormUpdatePost({
        title: post.postData.title,
        text: post.postData.text,
        document: post.postData.document,
        postScope: post.postData.postScope
      })
    }
  }, [post])

  useEffect(() => {
    if (isSubmit) {
      const formData = new FormData()
      Object.entries(formUpdatePost).forEach(([key, value]) => {
        if (value !== null) {
          if (value instanceof FileList) {
            Array.from(value).forEach((file) => {
              formData.append(key, file, file.name)
            })
          } else if (Array.isArray(value)) {
            value.forEach((item) => {
              formData.append(key, item)
            })
          } else {
            formData.append(key, value)
          }
        }
      })

      dispatch(fetchEditPost({ id: postId!, body: formData }))
    }
  }, [isSubmit, dispatch, postId])

  useEffect(() => {
    if (status === 200 && isSubmit) {
      navigate(-1)
      dispatch(resetResponseState())
    }
  }, [status, isSubmit, dispatch, navigate])

  useEffect(() => {
    if (formUpdatePost.document instanceof Array) {
      setUpdateDocumentUrls(formUpdatePost.document)
    }
  }, [formUpdatePost.document])

  useEffect(() => {
    if (postDeleteDocument) {
      setUpdateDocumentUrls([...updateDocumentUrls!.filter((item) => item !== postDeleteDocument)])
    }
    setPostDeleteDocument(null)
  }, [postDeleteDocument, updateDocumentUrls])

  function handleSubmitModal(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setIsSubmit(true)
  }

  function handleClickBtnCancel() {
    setFormUpdatePost({
      title: post!.postData.title,
      text: post!.postData.text,
      document: post!.postData.document,
      postScope: post!.postData.postScope
    })
  }

  function renderPreview(data: string[] | null): JSX.Element | null {
    if (data) {
      if (data.length === 2) {
        return (
          <div className="preview">
            <div className="preview__item">
              <img src={`http://localhost:3000/${data[0]}`}
                alt="post document"
                className="preview__img" />
            </div>
            <div className="preview__item">
              <img src={`http://localhost:3000/${data[1]}`}
                alt="post document"
                className="preview__img" />
            </div>
          </div>
        )
      } else if (data.length === 1) {
        return (
          <div className="preview">
            <div className="preview__item">
              <img src={`http://localhost:3000/${data[0]}`}
                alt="post document"
                className="preview__img" />
            </div>
          </div>
        )
      } else {
        return (
          <div className="preview">
            <Carousel
              data={data}
              setChangedArrDocument={setPostDeleteDocument}
            />
          </div>
        )
      }
    } else {
      return null
    }
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
                + (formUpdatePost.title && formUpdatePost.text ? "" : " btn_disabled")
              }
              disabled={!formUpdatePost.title || !formUpdatePost.text}
              formId="form-edit-post"
            >
              Update
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
                onChange={(e) => setFormUpdatePost({ ...formUpdatePost, title: e.target.value })}
                value={formUpdatePost.title}
                placeholder="Title Post"
                className="input_primary"
              />

              <TextArea
                name="text"
                maxLength={200}
                minLength={1}
                required={true}
                onChange={(e) => setFormUpdatePost({ ...formUpdatePost, text: e.target.value })}
                value={formUpdatePost.text}
                placeholder="What's happening?"
                className="text-area_primary"
              />
              <InputFile
                getDataDocument={setUpdateFiles}
                disabled={updateDocumentUrls?.length === MAX_FILES_IN_POST ? true : false}
              />
              {renderPreview(updateDocumentUrls)}
            </form>
          )}
      </div>
    </div>
  )
}
