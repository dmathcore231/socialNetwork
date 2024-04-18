import './styles.scss'
import { useRef, useState, useEffect } from 'react'
import { InputProps } from '../../types/interfaces/InputProps'


export function Input({ type, id, label, placeholder, className, required, value, name, onChange, error, multiple }: InputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (isFocused && !value?.trim()) {
      setIsError(true)
    } else if (error) {
      setIsError(true)
    }
    else {
      setIsError(false)
    }
  }, [value, error])

  return (
    <div className="input-wrapper">
      <div className="input-wrapper__item">
        <input
          ref={inputRef}
          type={type}
          id={id}
          className={(isError ? "input input_error" : "input") + (className ? ` ${className}` : "")}
          required={required}
          value={value}
          name={name}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiple={multiple}
        />
        <span className={(isError
          ? "input__placeholder input__placeholder_error"
          : "input__placeholder")
          + (value || isFocused ? " input__placeholder_active" : "")}
          onClick={() => inputRef.current?.focus()}
        >
          {placeholder}
        </span>
      </div>
      {label.text ?
        (<label
          htmlFor={id}
          ref={labelRef}
          className={(label.labelInvisible
            ? "input__label input__label_invisible"
            : "input__label")
            + (isError ? " input__label_error" : "")}
        >
          {label.text}
        </label>)
        : (null)}
    </div>
  )
}
