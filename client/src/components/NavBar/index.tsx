import './styles.scss'
import { useState, FormEvent, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchCreatePost } from '../../redux/postSlice'
import { Btn } from '../Btn'
import { Modal } from '../Modal'
import { TextArea } from '../TextArea'
import { Input } from '../Input'
import { defaultFormCreatePost } from '../../helpers/defaultState'
import { defaultModalState } from '../../helpers/defaultState'
import { HomeIcon } from '../../assets/icons/HomeIcon'
import { NotificationsIcon } from '../../assets/icons/NotificationsIcon'
import { MessagesIcon } from '../../assets/icons/MessagesIcon'
import { BookmarkIcon } from '../../assets/icons/BookmarkIcon'
import { ProfileIcon } from '../../assets/icons/ProfileIcon'
import { CommunitiesIcon } from '../../assets/icons/CommunitiesIcon'

export function NavBar(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { status } = useAppSelector(state => state.post.ResponseState)

  const [modalActive, setModalActive] = useState(defaultModalState)
  const [formCreatePost, setFormCreatePost] = useState(defaultFormCreatePost)
  const [isSubmit, setIsSubmit] = useState(false)

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

  useEffect(() => {
    if (status === 201 && modalActive.isActive) {
      setModalActive(defaultModalState)
      setFormCreatePost(defaultFormCreatePost)
      navigate('/profile')
    }
  }, [status, navigate])

  function handleSubmitModal(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setIsSubmit(true)
  }

  function handleClickBtnCancel(): void {
    setModalActive(defaultModalState)
    setFormCreatePost(defaultFormCreatePost)
  }

  return (
    <nav className="nav-bar">
      <div className="nav-bar__logo">
        <h1>Logo</h1>
      </div>
      <ul className="nav-bar__list">
        <li className="nav-bar__item">
          <NavLink to='/' className="nav-bar__link">
            <HomeIcon width='24px' height='24px' />
            <h4>Home</h4>
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink to="/notifications" className="nav-bar__link">
            <NotificationsIcon width='24px' height='24px' />
            <h4>Notifications</h4>
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink to="/messages" className="nav-bar__link">
            <MessagesIcon width='24px' height='24px' />
            <h4>Messages</h4>
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink to="/bookmarks" className="nav-bar__link">
            <BookmarkIcon width='24px' height='24px' />
            <h4>Bookmarks</h4>
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink to="/profile" className="nav-bar__link">
            <ProfileIcon width='24px' height='24px' />
            <h4>Profile</h4>
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink to="/communities" className="nav-bar__link">
            <CommunitiesIcon width='24px' height='24px' />
            <h4>Communities</h4>
          </NavLink>
        </li>
      </ul>
      <Btn
        type="button"
        className="btn_primary"
        onClick={() => setModalActive({ isActive: true, modalContent: 'createPost' })}
      >
        Create Post
      </Btn>

      <Modal
        isActive={modalActive.isActive}
        title={"Create New Post"}
        onClose={handleClickBtnCancel}
        cancelBtn={{
          visible: true,
          onClick: handleClickBtnCancel,
        }}
        submitBtn={{
          visible: true,
        }}
        idForm="form-create-post"
      >
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
      </Modal>
    </nav>
  )
}
