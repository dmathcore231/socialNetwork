import './styles.scss'
import { useState, useEffect, useRef } from 'react'
import { Btn } from '../Btn'
import { TextArea } from '../TextArea'
import { AnswerProps } from '../../types/interfaces/AnswerProps'

export function Answer({ setIsActive, userTagForReoly }: AnswerProps): JSX.Element {
  const [valueComment, setValueComment] = useState<string>('')


  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsActive(false)
    setValueComment('')
  }

  return (
    <div className="answer">
      <div className="answer__item">
        <form className="answer-post-form"
          onSubmit={handleSubmitForm}
        >
          <span className="answer__user-tag">{`for ${userTagForReoly}`}</span>
          <TextArea
            name='answer'
            id='answer'
            maxLength={200}
            minLength={1}
            required={true}
            onChange={e => setValueComment(e.target.value)}
            value={valueComment}
            placeholder="Post your reply"
            className="text-area_padding_size_btn-size text-area_height_size_sm"
            btnInTextArea={
              <div className="text-area__btn">
                <Btn
                  type="submit"
                  className="btn_primary btn_padding_none_vertical"
                >
                  Reply
                </Btn>
              </div>
            }
          />
        </form>
      </div>
    </div>
  )
}





