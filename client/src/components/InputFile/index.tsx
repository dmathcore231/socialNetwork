import "./styles.scss"
import { useState } from "react"
import { InputFileProps } from "../../types/interfaces/InputFileProps"
import { MediaIcon } from '../../assets/icons/MediaIcon'

export function InputFile({ getDataDocument, disabled }: InputFileProps): JSX.Element {
  const [value, setValue] = useState<FileList | null>(null)
  const [limitFiles, setLimitFiles] = useState(false)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files && files?.length > 5) {
      return setLimitFiles(true)
    } else {
      setLimitFiles(false)
    }
    setValue(files)
    getDataDocument(files)
  }

  function renderTextFile() {
    if (disabled || limitFiles) {
      return (
        <p className="error"> Max 5 files</p>
      )
    } else {
      if (value) {
        return (
          <p>Selected {value.length} files</p>
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
