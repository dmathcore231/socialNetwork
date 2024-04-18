import './styles.scss'
import { useState, FormEvent, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchCreatePost } from '../../redux/postSlice'
import { Btn } from '../Btn'
import { Modal } from '../Modal'
import { TextArea } from '../TextArea'
import { Input } from '../Input'
import { MiniProfile } from '../MiniProfile'
import { Logo } from '../Logo'
import { defaultFormCreatePost } from '../../helpers/defaultState'
import { defaultModalState } from '../../helpers/defaultState'
import { HomeIcon } from '../../assets/icons/HomeIcon'
import { NotificationsIcon } from '../../assets/icons/NotificationsIcon'
import { MessagesIcon } from '../../assets/icons/MessagesIcon'
import { BookmarkIcon } from '../../assets/icons/BookmarkIcon'
import { ProfileIcon } from '../../assets/icons/ProfileIcon'
import { CommunitiesIcon } from '../../assets/icons/CommunitiesIcon'
import { BurgerMenuIcon } from '../../assets/icons/BurgerMenuIcon'
import { PostCreateIcon } from '../../assets/icons/PostCreateIcon'

export interface NavBarProps {
  isActiveBurgerMenu: boolean
  setIsActiveBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export function NavBar({ isActiveBurgerMenu, setIsActiveBurgerMenu }: NavBarProps): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const breakPointXl = useMediaQuery({ query: '(max-width: 75rem)' })
  const breakPointMd = useMediaQuery({ query: '(max-width: 48rem)' })
  const { status } = useAppSelector(state => state.post.ResponseState)

  const [modalActive, setModalActive] = useState(defaultModalState)
  const [formCreatePost, setFormCreatePost] = useState(defaultFormCreatePost)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false)
      const formData = new FormData()
      Object.entries(formCreatePost).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value)
        }
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
      <div className="nav-bar__item
      nav-bar__burger-menu">
        <Btn
          type="button"
          className="btn_transparent"
          onClick={() => setIsActiveBurgerMenu(!isActiveBurgerMenu)}
        >
          <BurgerMenuIcon width="26px" height="26px" />
        </Btn>
      </div>
      <div className="nav-bar__item">
        {breakPointXl
          ? <Logo size='sm' />
          : <Logo size='md' />
        }
      </div>
      {breakPointMd
        ? null
        : (
          <>
            <div className="nav-bar__item">
              <ul className="nav-bar__list">
                <li className="nav-bar__item">
                  <NavLink to='/' className="nav-bar__link">
                    <HomeIcon width="26px" height="26px" />
                    <h4 className="nav-bar__title-link">Home</h4>
                  </NavLink>
                </li>
                <li className="nav-bar__item">
                  <NavLink to="/notifications" className="nav-bar__link">
                    <NotificationsIcon width="26px" height="26px" />
                    <h4 className="nav-bar__title-link">Notifications</h4>
                  </NavLink>
                </li>
                <li className="nav-bar__item">
                  <NavLink to="/messages" className="nav-bar__link">
                    <MessagesIcon width="26px" height="26px" />
                    <h4 className="nav-bar__title-link">Messages</h4>
                  </NavLink>
                </li>
                <li className="nav-bar__item">
                  <NavLink to="/bookmarks" className="nav-bar__link">
                    <BookmarkIcon width="26px" height="26px" />
                    <h4 className="nav-bar__title-link">Bookmarks</h4>
                  </NavLink>
                </li>
                <li className="nav-bar__item">
                  <NavLink to="/profile" className="nav-bar__link">
                    <ProfileIcon width="26px" height="26px" />
                    <h4 className="nav-bar__title-link">Profile</h4>
                  </NavLink>
                </li>
                <li className="nav-bar__item">
                  <NavLink to="/communities" className="nav-bar__link">
                    <CommunitiesIcon width="26px" height="26px" />
                    <h4 className="nav-bar__title-link">Communities</h4>
                  </NavLink>
                </li>
                <li className="nav-bar__item">
                  <Btn
                    type="button"
                    className={breakPointXl ? "btn_primary btn_rounded btn_color_white" : "btn_primary"}
                    onClick={() => setModalActive({ isActive: true, modalContent: 'createPost' })}
                  >
                    {breakPointXl ? <PostCreateIcon width="30px" height="30px" /> : "Post"}
                  </Btn>
                </li>
                <li className="nav-bar__item">
                  <MiniProfile size={breakPointXl ? 'xs' : 'sm'} />
                </li>
              </ul>
            </div>

          </>
        )}


      <Modal
        isActive={modalActive.isActive && modalActive.modalContent === 'createPost'}
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

          <div className="form-create-post__footer">
            footer
          </div>
        </form>
      </Modal>
    </nav>
  )
}
