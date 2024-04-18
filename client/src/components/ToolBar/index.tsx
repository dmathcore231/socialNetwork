import './styles.scss'
import { InputFile } from '../InputFile'
import { ToolBarProps } from '../../types/interfaces/ToolBarProps'
export function ToolBar({ getDataDocument }: ToolBarProps): JSX.Element {
  return (
    <div className="tool-bar">
      <div className="tool-bar__item">
        <InputFile getDataDocument={getDataDocument} />
      </div>
    </div>
  )
}
