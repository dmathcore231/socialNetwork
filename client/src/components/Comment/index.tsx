import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import { SIZE_ICON_MD, SIZE_ICON_SM } from '../../helpers'
import { AvatarContainer } from '../AvatarContainer'
import { Btn } from '../Btn'
import { CommentProps } from '../../types/interfaces/CommentProps'
import { CommentData } from '../../types/CommentData'
import { AvatarDefaultIcon } from '../../assets/icons/AvatarDefaultIcon'
import { MoreIcon } from '../../assets/icons/MoreIcon'
import { LikeIcon } from '../../assets/icons/LikeIcon'

export function Comment({ data }: CommentProps): JSX.Element {
  const breakPointSm = useMediaQuery({ query: '(max-width: 36rem)' })
  const sizeIcon = breakPointSm ? SIZE_ICON_SM : SIZE_ICON_MD

  return (
    <>
      {data.map((comment: CommentData) => {
        return (
          <div className="comment" key={comment._id}>
            <div className="comment-header">
              <div className="comment-header__item">
                <AvatarContainer
                  className="avatar_border_color_white avatar_size_sm avatar_bg_color_gray-200"
                >
                  {comment.userDataCreator.userAvatar
                    ? <img src={`http://localhost:3000/${comment.userDataCreator.userAvatar}`} alt="user avatar" className="comment-header__avatar" />
                    : <AvatarDefaultIcon width={sizeIcon} height={sizeIcon} />
                  }
                </AvatarContainer>
                <div className="comment-creator-data">
                  <div className="comment-creator-data__item">
                    <span className="comment-creator-data__text"
                    >
                      {comment.userDataCreator.fullName}
                    </span>
                    <span className="comment-creator-data__text comment-creator-data__text_color_gray"
                    >
                      {comment.userDataCreator.tag}
                    </span>
                  </div>
                  <span className="comment-creator-data__date-creation">
                    | {comment.formattedDate}
                  </span>
                </div>
              </div>
              <div className="comment-header__item">
                <Btn
                  type="button"
                  className="btn_transparent_shadow_enabled"
                  onClick={() => console.log('clicked')}
                >
                  <MoreIcon width={sizeIcon} height={sizeIcon} />
                </Btn>
              </div>
            </div>
            <div className="comment-body">
              <div className="comment-body__text">
                {comment.text}
              </div>
            </div>
            <div className="comment-footer">
              <div className="comment-footer__item">
                <span className="comment-answer">
                  Answer
                </span>
              </div>
              <div className="comment-footer__item">
                <div className="comment-footer__like">
                  <Btn
                    type="button"
                    className="btn_transparent_shadow_enabled"
                    onClick={() => console.log('clicked')}
                  >
                    <LikeIcon width={sizeIcon} height={sizeIcon} />
                  </Btn>
                </div>
                <div className="comment-footer__like-counter">
                  {comment.likes.length}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
