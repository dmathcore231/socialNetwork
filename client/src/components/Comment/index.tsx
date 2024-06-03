import './styles.scss'
import { useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { SIZE_ICON_MD, SIZE_ICON_SM } from '../../helpers'
import { AvatarContainer } from '../AvatarContainer'
import { Btn } from '../Btn'
import { Answer } from '../Answer'
import { CommentProps } from '../../types/interfaces/CommentProps'
import { AvatarDefaultIcon } from '../../assets/icons/AvatarDefaultIcon'
import { MoreIcon } from '../../assets/icons/MoreIcon'
import { LikeIcon } from '../../assets/icons/LikeIcon'

export function Comment({ data }: CommentProps): JSX.Element {
  const breakPointSm = useMediaQuery({ query: '(max-width: 36rem)' })
  const sizeIcon = breakPointSm ? SIZE_ICON_SM : SIZE_ICON_MD
  const answerRef = useRef<HTMLDivElement>(null)

  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  return (
    <div className="comment" key={data._id}>
      <div className="comment-header">
        <div className="comment-header__item">
          <AvatarContainer
            className="avatar_border_color_white avatar_size_sm avatar_bg_color_gray-200"
          >
            {data.userDataCreator.userAvatar
              ? <img src={`http://localhost:3000/${data.userDataCreator.userAvatar}`} alt="user avatar" className="comment-header__avatar" />
              : <AvatarDefaultIcon width={sizeIcon} height={sizeIcon} />
            }
          </AvatarContainer>
          <div className="comment-creator-data">
            <div className="comment-creator-data__item">
              <span className="comment-creator-data__text"
              >
                {data.userDataCreator.fullName}
              </span>
              <span className="comment-creator-data__text comment-creator-data__text_color_gray"
              >
                {data.userDataCreator.tag}
              </span>
            </div>
            <span className="comment-creator-data__date-creation">
              | {data.formattedDate}
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
          {data.text}
        </div>
      </div>
      <div className="comment-footer">
        <div className='comment-footer-wrapper'>
          <div className="comment-footer__item">
            <Btn
              type="button"
              className="btn_transparent btn_size_sm btn_padding_none"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              Answer
            </Btn>
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
              {data.likes.length}
            </div>
          </div>
        </div>
        {showAnswer
          ? (
            <div className="comment-footer__item comment-footer__item_width_100"
              ref={answerRef}
            >
              <Answer setIsActive={setShowAnswer} userTagForReoly={data.userDataCreator.tag} />
            </div>
          )
          : null}
      </div>
    </div>
  )
}

