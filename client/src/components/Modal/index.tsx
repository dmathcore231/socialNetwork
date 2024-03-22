import './styles.scss'
import { ModalProps } from '../../types/interfaces/ModalProps'
import { Btn } from '../Btn'
import { CloseIcon } from '../../assets/icons/CloseIcon'

export function Modal({ isActive, title, children, onClose, cancelBtn, submitBtn, modalClass, idForm }: ModalProps): JSX.Element | null {

  if (!isActive) return null

  return (
    <div className={"modal" + (modalClass ? ` ${modalClass}` : "")}>
      <div className="modal-content">
        <div className="modal-content__header">
          <div className='modal-content__close'>
            <Btn
              type="button"
              className="btn_transparent"
              onClick={onClose}
            >
              <CloseIcon width='16' height='16' />
            </Btn>
          </div>
          <div className='modal-content__title'>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="modal-content__body">
          {children}
        </div>
        <div className="modal-content__footer">
          {submitBtn.visible
            ? (
              <Btn
                type="submit"
                className="btn_primary"
                formId={idForm}
                onClick={submitBtn.onClick}
              >
                {submitBtn.title ? submitBtn.title : "Submit"}
              </Btn>
            )
            : (null)
          }
          {cancelBtn.visible
            ? (
              <Btn
                type="button"
                className="btn_primary btn_primary_outline"
                onClick={cancelBtn.onClick ? cancelBtn.onClick : onClose}
              >
                {cancelBtn.title ? cancelBtn.title : "Cancel"}
              </Btn>
            )
            : (null)
          }
        </div>
      </div>
    </div>
  )
}
