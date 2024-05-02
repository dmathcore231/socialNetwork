import './styles.scss'
import { InputFile } from '../InputFile'
import { ToolBarProps } from '../../types/interfaces/ToolBarProps'
import { MAX_FILES_IN_POST } from '../../helpers'

export function ToolBar({ getDataDocument }: ToolBarProps): JSX.Element {
  return (
    <div className="tool-bar">
      <div className="tool-bar__item">
        <InputFile getDataDocument={getDataDocument}
          maxFiles={MAX_FILES_IN_POST}
        />
      </div>
    </div>
  )
}
