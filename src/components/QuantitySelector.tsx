import React, { useState, ChangeEvent } from 'react'
import CustomInputNumber from './CustomInputNumber'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

export interface QuantitySelectorProps {
  name: string
  max: number
  handleChange: (number: number) => void
  value: number
  min: number
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  name,
  max,
  min,
  handleChange,
  value,
}) => {
  const [initialValue, setInitialValue] = useState<string | number>(value)
  const step = 1

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const isEmpty = inputValue === ''
    const isValidNumber = !isNaN(Number(inputValue))

    if (isEmpty) {
      setInitialValue('')
      return
    }

    if (isValidNumber) {
      setInitialValue(Number(inputValue))
    }
  }

  const handleButtonClick = (direction: 'increment' | 'decrement') => {
    const newValue = direction === 'increment' ? value + step : value - step
    if (newValue >= min && newValue <= max) {
      handleChange(newValue)
      setInitialValue(newValue)
    }
  }

  const handleDecrementClick = () => handleButtonClick('decrement')

  const handleIncrementClick = () => handleButtonClick('increment')

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const isValidNumber =
      !isNaN(Number(inputValue)) &&
      Number(inputValue) >= min &&
      Number(inputValue) <= max

    if (isValidNumber) {
      handleChange(Number(inputValue))
    } else {
      setInitialValue(value)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        className={`decrement-btn ${value <= min && 'disabled'}`}
        onClick={handleDecrementClick}
        aria-label={`minus ${step}`}
        disabled={value <= min}
        data-testid="decrement-button"
      >
        <MinusSmallIcon aria-hidden="true" />
      </button>
      <CustomInputNumber
        value={initialValue}
        min={0}
        max={max}
        step={step}
        name={name}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={false}
      />
      <button
        className={`increment-btn ${value >= max && 'disabled'}`}
        onClick={handleIncrementClick}
        aria-label={`add ${step}`}
        disabled={value >= max}
        data-testid="increment-button"
      >
        <PlusSmallIcon aria-hidden="true" />
      </button>
    </div>
  )
}

export default QuantitySelector
