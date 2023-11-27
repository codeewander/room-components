import { ChangeEvent, FocusEvent } from 'react'
interface CustomInputNumberProps {
  min: number
  max: number
  step: number
  name: string
  value: number | string
  disabled: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
}
const CustomInputNumber = (props: CustomInputNumberProps) => {
  const { min, max, step, name, value, disabled, onChange, onBlur } = props
  return (
    <input
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
    />
  )
}

export default CustomInputNumber
