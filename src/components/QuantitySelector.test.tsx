import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import QuantitySelector, { QuantitySelectorProps } from './QuantitySelector'
import '@testing-library/jest-dom'

describe('QuantitySelector', () => {
  const mockHandleChange = jest.fn()

  const testData: QuantitySelectorProps = {
    name: 'quantity',
    max: 10,
    min: 1,
    handleChange: mockHandleChange,
    value: 5,
  }

  const defaultStep = 1

  const renderQuantitySelector = (props?: QuantitySelectorProps) =>
    render(<QuantitySelector {...testData} {...props} />)

  it('should handle increment button click correctly', async () => {
    const { getByTestId } = renderQuantitySelector()
    const incrementButton = getByTestId('increment-button')
    fireEvent.click(incrementButton)

    await waitFor(() => {
      expect(mockHandleChange).toHaveBeenCalledWith(
        testData.value + defaultStep
      )
    })
  })

  it('should handle decrement button click correctly', async () => {
    const { getByTestId } = renderQuantitySelector()

    const incrementButton = getByTestId('decrement-button')
    fireEvent.click(incrementButton)

    await waitFor(() => {
      expect(mockHandleChange).toHaveBeenCalledWith(
        testData.value - defaultStep
      )
    })
  })

  it('decrement button should have "disabled" class when value <= min', () => {
    const decrementTestData: QuantitySelectorProps = {
      name: 'quantity',
      max: 10,
      min: 1,
      handleChange: mockHandleChange,
      value: 1,
    }

    const { getByTestId } = renderQuantitySelector(decrementTestData)
    const decrementButton = getByTestId('decrement-button')

    expect(decrementButton).toHaveClass('disabled')
  })

  it('increment button should have "disabled" class when value >= max', () => {
    const incrementTestData: QuantitySelectorProps = {
      name: 'quantity',
      max: 10,
      min: 1,
      handleChange: mockHandleChange,
      value: 10,
    }

    const { getByTestId } = renderQuantitySelector(incrementTestData)
    const incrementButton = getByTestId('increment-button')

    expect(incrementButton).toHaveClass('disabled')
  })

  it('should update state if input blur with valid value', async () => {
    const { getByTestId } = renderQuantitySelector()

    const inputElement = getByTestId('custom-input-number')
    fireEvent.change(inputElement, { target: { value: '1' } })
    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(inputElement).toHaveAttribute('value', '1')
      expect(inputElement).toHaveAttribute('name', 'quantity')
    })
  })

  it('should not update state if input blur with invalid value', async () => {
    const { getByTestId } = renderQuantitySelector()

    const inputElement = getByTestId('custom-input-number')
    fireEvent.change(inputElement, { target: { value: 'abc' } })
    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(inputElement).toHaveAttribute('value', '5')
      expect(inputElement).toHaveAttribute('name', 'quantity')
    })
  })

  it('should not update state if input blur with value outside range', async () => {
    const { getByTestId } = renderQuantitySelector()

    const inputElement = getByTestId('custom-input-number')
    fireEvent.change(inputElement, { target: { value: '11' } })
    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(inputElement).toHaveAttribute('value', '5')
      expect(inputElement).toHaveAttribute('name', 'quantity')
    })
  })
})
