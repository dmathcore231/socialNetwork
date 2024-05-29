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
import { CloseIcon } from "../../../assets/icons/CloseIcon"

export function EditPost(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const postId = useParams().id

  const { post, ResponseState: { loading, status } } = useAppSelector(state => state.post)

  const [isSubmit, setIsSubmit] = useState(false)
  const [formUpdatePost, setFormUpdatePost] = useState(defaultFormUpdatePost)
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null)

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
    if (uploadedFiles) {
      setFormUpdatePost(prevState => ({
        ...prevState,
        document: prevState.document ? [...prevState.document, ...uploadedFiles] : uploadedFiles
      }))
    }
  }, [uploadedFiles])

  useEffect(() => {
    if (isSubmit) {
      const formData = new FormData()
      formData.append('title', formUpdatePost.title)
      formData.append('text', formUpdatePost.text)
      formData.append('postScope', formUpdatePost.postScope)
      if (formUpdatePost.document) {
        formUpdatePost.document.forEach((item) => {
          formData.append('document', item)
        })
      }

      dispatch(fetchEditPost({ id: postId!, body: formData }))
    }
  }, [isSubmit, dispatch, postId])

  useEffect(() => {
    if (status === 200 && isSubmit) {
      navigate('/')
      dispatch(resetResponseState())
    }
  }, [status, isSubmit, dispatch, navigate])

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

  function handleClickBtnDeleteDocument(document: string | File | null) {
    if (typeof document === 'string' && formUpdatePost.document) {
      setFormUpdatePost({
        ...formUpdatePost,
        document: formUpdatePost.document.filter((item) => {
          if (typeof item === 'string') {
            return item !== document
          }
        })
      })
    } else if (document instanceof File && formUpdatePost.document) {
      setFormUpdatePost({
        ...formUpdatePost,
        document: formUpdatePost.document.filter((item) => {
          if (item instanceof File) {
            return (item.name && item.lastModified) !== (document.name && document.lastModified)
          }
        })
      })
    }
    else {
      setFormUpdatePost({
        ...formUpdatePost,
        document: null
      })
    }
  }

  function renderPreview(): JSX.Element | null {
    if (formUpdatePost.document && formUpdatePost.document.length > 2) {
      return (
        <div className="preview">
          <Carousel
            data={formUpdatePost.document}
            editBtnVisible={true}
            setChangedArrDocument={handleClickBtnDeleteDocument}
          />
        </div>
      )
    } else if (formUpdatePost.document && formUpdatePost.document.length <= 2) {
      return (
        <div className="preview">
          {formUpdatePost.document.map((item, index) => (
            <div className="preview__item" key={index}>
              <span className="preview__btn-edit">
                <Btn
                  type="button"
                  className="btn_transparent_shadow_enabled btn_transparent_shadow_color_white"
                  onClick={() => handleClickBtnDeleteDocument(item)}
                >
                  <CloseIcon width="16" height="16" />
                </Btn>
              </span>
              <img src={item instanceof File
                ? URL.createObjectURL(item)
                : `http://localhost:3000/${item}`}
                className="preview__img" />
            </div>
          ))

          }
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className="edit-post">
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
                getDataDocument={setUploadedFiles}
                dataDocument={formUpdatePost.document}
                maxFiles={formUpdatePost.document
                  ? MAX_FILES_IN_POST - formUpdatePost.document.length
                  : MAX_FILES_IN_POST}
                disabled={formUpdatePost.document?.length === MAX_FILES_IN_POST ? true : false}
              />
              {renderPreview()}
            </form>
          )}
      </div>
    </div>
  )
}
