import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

export interface CustomInputNumberProps {
  min: number
  max: number
  step: number
  name: string
  value: number
  disabled: {
    increment: boolean
    decrement: boolean
  }
  onChange: (inputNumber: number) => void
  onBlur: (inputNumber: number) => void
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

  const handleBlur = () => {
    const isValidNumber =
      !isNaN(Number(inputValue)) &&
      Number(inputValue) >= min &&
      Number(inputValue) <= max

    if (isValidNumber) {
      onBlur(Number(inputValue))
    } else {
      setInputValue(value)
    }
  }

  const handleIncrement = () => {
    setInputValue((prev) => {
      const newValue = Number(prev) + step
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        onChange(newValue)
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
        onChange(newValue)
        return newValue
      } else {
        return prev
      }
    })
  }

  const handleLongPress = (action: () => void) => {
    action()
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
    <div className="flex gap-2" data-testid="custom-input-number">
      <button
        className={`decrement-btn ${disabled.decrement && 'disabled'}`}
        onMouseDown={() => handleLongPress(handleDecrement)}
        onMouseUp={handleEndLongPress}
        onMouseLeave={handleEndLongPress}
        aria-label={`minus ${step}`}
        disabled={disabled.decrement}
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
        className="input-number"
        type="number"
        value={inputValue}
        min={min}
        max={max}
        step={step}
        name={name}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      <button
        className={`increment-btn ${disabled.increment && 'disabled'}`}
        onMouseDown={() => handleLongPress(handleIncrement)}
        onMouseUp={handleEndLongPress}
        onMouseLeave={handleEndLongPress}
        aria-label={`add ${step}`}
        disabled={disabled.increment}
        data-testid="increment-button"
      >
        <PlusSmallIcon aria-hidden="true" />
      </button>
    </div>
  )
}

export default CustomInputNumber
