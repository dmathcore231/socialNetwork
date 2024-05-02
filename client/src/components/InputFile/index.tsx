import "./styles.scss"
import { useState } from "react"
import { InputFileProps } from "../../types/interfaces/InputFileProps"
import { MediaIcon } from '../../assets/icons/MediaIcon'

export function InputFile({ getDataDocument, dataDocument, maxFiles, disabled }: InputFileProps): JSX.Element {
  const [limitFiles, setLimitFiles] = useState(false)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      const arrFiles = Array.from(files)
      if (arrFiles.length > maxFiles) {
        return setLimitFiles(true)
      } else {
        setLimitFiles(false)
      }

      getDataDocument(arrFiles)
    }
  }


  function renderTextFile() {
    if (disabled || limitFiles) {
      return (
        <p className="error">{maxFiles === 0 ? 'Max files' : `Max ${maxFiles} files`}</p>
      )
    } else {
      if (dataDocument && dataDocument.length > 0) {
        return (
          <p>Selected {dataDocument.length} files</p>
        )
      } else {
        return null
      }
    }
  }

  return (
    <div className="input-file">
      <label className={"input-file__label" + (disabled ? " input-file__label_disabled" : "")}>
        <input
          className="input-file__input"
          type="file"
          name="document"
          multiple
          onChange={handleFileChange}
          disabled={disabled}
        />
        <div className="input-file__icon">
          <MediaIcon width="20px" height="20px" />
        </div>
      </label>
      {renderTextFile()}
    </div>
  )
}
