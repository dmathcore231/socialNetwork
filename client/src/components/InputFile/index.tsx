import "./styles.scss"
import { useState } from "react"
import { InputFileProps } from "../../types/interfaces/InputFileProps"
import { MediaIcon } from '../../assets/icons/MediaIcon'

export function InputFile({ getDataDocument }: InputFileProps): JSX.Element {
  const [value, setValue] = useState<FileList | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    setValue(files)
    getDataDocument(files)
  }

  return (
    <div className="input-file">
      <label className="input-file__label">
        <input
          className="input-file__input"
          type="file"
          name="document"
          multiple
          onChange={handleFileChange}
        />
        <div className="input-file__icon">
          <MediaIcon width="20px" height="20px" />
        </div>
      </label>
      {value && <p>Selected files: {value.length}</p>}
    </div>
  )
}
