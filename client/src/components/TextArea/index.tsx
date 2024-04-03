import './styles.scss'
import { TextAreaProps } from '../../types/interfaces/TextAreaProps'

export function TextArea({ name, maxLength, minLength, required, onChange, disabled, id, placeholder, className, value, col, row, spellCheck }: TextAreaProps): JSX.Element {
  return (
    <div className='text-area-wrapper'>
      <div className='text-area__item'>
        <textarea
          name={name}
          id={id}
          className={`text-area` + (className ? ` ${className}` : "")}
          maxLength={maxLength}
          minLength={minLength}
          required={required}
          onChange={onChange}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          cols={col}
          rows={row}
          spellCheck={spellCheck}
        />
      </div>
    </div>
  )
}
