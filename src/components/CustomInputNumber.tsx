import React, { ChangeEvent, FocusEvent, KeyboardEvent } from 'react'
export interface CustomInputNumberProps {
  min: number
  max: number
  step: number
  name: string
  value: number | string
  disabled: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
}
const CustomInputNumber: React.FC<CustomInputNumberProps> = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}) => {
  return (
    <>
      <label
        className="hidden"
        htmlFor={`${name}-number-of-people`}
      >{`${name} people`}</label>
      <input
        id={`${name}-number-of-people`}
        className={`input-number ${disabled ? 'disabled' : ''}`}
        type="number"
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        data-testid="custom-input-number"
      />
    </>
  )
}

export default CustomInputNumber
