import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  MouseEvent,
  FocusEvent,
} from 'react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

export interface CustomInputNumberProps {
  min: number
  max: number
  step: number
  name: string
  value: number
  disabled: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
  handelInputChange: (inputNumber: number) => void
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
  handelInputChange,
}) => {
  const [inputValue, setInputValue] = useState<number | string>(value)
  const timeoutRef = useRef<number | null>(null)
  const PRESS_TIME = 200

  useEffect(() => {
    if (value) {
      setInputValue(value)
    }
  }, [value])

  useEffect(() => {
    return () => {
      clearInterval(timeoutRef.current!)
    }
  }, [])

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    const isValidNumber =
      !isNaN(Number(inputValue)) &&
      Number(inputValue) >= min &&
      Number(inputValue) <= max

    if (isValidNumber) {
      handelInputChange(Number(inputValue))
    } else {
      setInputValue(value)
    }
  }

  const handleIncrement = () => {
    setInputValue((prev) => {
      const newValue = Number(prev) + step
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        handelInputChange(newValue)
        return newValue
      } else {
        return prev
      }
    })
  }

  const handleDecrement = () => {
    setInputValue((prev) => {
      const newValue = Number(prev) - step
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        handelInputChange(newValue)
        return newValue
      } else {
        return prev
      }
    })
  }

  const handleLongPress = (
    action: (e: MouseEvent<HTMLButtonElement>) => void,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    action(e)
    timeoutRef.current = setInterval(action, PRESS_TIME)
  }

  const handleEndLongPress = () => {
    clearInterval(timeoutRef.current!)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const isEmpty = inputValue === ''
    const isValidNumber = !isNaN(Number(inputValue))

    if (isEmpty) {
      setInputValue('')
      return
    }

    if (isValidNumber) {
      setInputValue(Number(inputValue))
    }
  }

  return (
    <div
      className="flex gap-2"
      data-testid="custom-input-number"
      onBlur={onBlur}
      onChange={onChange}
    >
      <button
        className={`decrement-btn ${value <= min && 'disabled'}`}
        onMouseDown={(e) => handleLongPress(handleDecrement, e)}
        onMouseUp={handleEndLongPress}
        onMouseLeave={handleEndLongPress}
        aria-label={`minus ${step}`}
        disabled={value <= min}
        data-testid="decrement-button"
      >
        <MinusSmallIcon aria-hidden="true" />
      </button>
      <label
        className="hidden"
        htmlFor={`${name}-number-of-people`}
      >{`${name} people`}</label>
      <input
        id={`${name}-number-of-people`}
        className={`input-number ${disabled ? 'disabled' : ''}`}
        type="number"
        value={inputValue}
        min={min}
        max={max}
        step={step}
        name={name}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        data-testid="input"
      />
      <button
        className={`increment-btn ${value >= max && 'disabled'}`}
        onMouseDown={(e) => handleLongPress(handleIncrement, e)}
        onMouseUp={handleEndLongPress}
        onMouseLeave={handleEndLongPress}
        aria-label={`add ${step}`}
        disabled={value >= max}
        data-testid="increment-button"
      >
        <PlusSmallIcon aria-hidden="true" />
      </button>
    </div>
  )
}

export default CustomInputNumber
