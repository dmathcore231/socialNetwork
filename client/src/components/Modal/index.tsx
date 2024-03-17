import './styles.scss'
import { ModalProps } from '../../types/interfaces/ModalProps'
import { Btn } from '../Btn'

export function Modal({ isActive, title, children, onClose, onSubmit, modalClass, titleBtnSubmit, titleBtnCancel }: ModalProps): JSX.Element | null {
  if (!isActive) return null
  return (
    <div className={"modal" + (modalClass ? ` ${modalClass}` : "")}>
      <div className="modal-content">
        <div className="modal-content__header">
          <h2>{title}</h2>
        </div>
        <div className="modal-content__body">
          {children}
        </div>
        <div className="modal-content__footer">
          <Btn
            type="submit"
            className="btn_primary"
            onClick={onSubmit}
          >
            {titleBtnSubmit ? titleBtnSubmit : "Submit"}
          </Btn>
          <Btn
            type="button"
            className="btn_primary btn_primary_outline"
            onClick={onClose}
          >
            {titleBtnCancel ? titleBtnCancel : "Cancel"}
          </Btn>
        </div>
      </div>
    </div>
  )
}
