import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import CustomInputNumber, { CustomInputNumberProps } from './CustomInputNumber'
import '@testing-library/jest-dom'

describe('CustomInputNumber', () => {
  const mockOnChange = jest.fn()
  const mockOnBlur = jest.fn()
  const mockOnInputChange = jest.fn()

  const testData: CustomInputNumberProps = {
    min: 0,
    max: 4,
    step: 1,
    name: 'test',
    value: 2,
    disabled: false,
    onChange: mockOnChange,
    onBlur: mockOnBlur,
    handelInputChange: mockOnInputChange,
  }

  const renderCustomInputNumber = (props?: CustomInputNumberProps) =>
    render(<CustomInputNumber {...testData} {...props} />)

  beforeEach(() => {
    mockOnChange.mockClear()
    mockOnBlur.mockClear()
    mockOnInputChange.mockClear()
  })

  it('input should have specific attributes', () => {
    const { container } = renderCustomInputNumber()

    const inputElement = container.querySelector('input')

    expect(inputElement).toHaveAttribute('id', 'test-number-of-people')
    expect(inputElement).toHaveAttribute('type', 'number')
    expect(inputElement).toHaveAttribute('min', testData.min.toString())
    expect(inputElement).toHaveAttribute('max', testData.max.toString())
    expect(inputElement).toHaveAttribute('step', testData.step.toString())
    expect(inputElement).toHaveAttribute('name', testData.name)
    expect(inputElement).toHaveAttribute('value', testData.value.toString())
  })

  it('should handle short press increment correctly', async () => {
    const { getByTestId } = renderCustomInputNumber()
    const incrementButton = getByTestId('increment-button')
    fireEvent.mouseDown(incrementButton)
    fireEvent.mouseUp(incrementButton)

    await waitFor(() => {
      expect(mockOnInputChange).toHaveBeenCalledWith(
        testData.value + testData.step
      )
    })
  })

  it('should handle short press decrement correctly', async () => {
    const { getByTestId } = renderCustomInputNumber()
    const decrementButton = getByTestId('decrement-button')
    fireEvent.mouseDown(decrementButton)
    fireEvent.mouseUp(decrementButton)

    await waitFor(() => {
      expect(mockOnInputChange).toHaveBeenCalledWith(
        testData.value - testData.step
      )
    })
  })

  it('should disable input when disabled prop is true', () => {
    const { container } = renderCustomInputNumber({
      ...testData,
      disabled: true,
    })

    const inputElement = container.querySelector('input')
    expect(inputElement).toBeDisabled()
  })

  it('should handle long press increment correctly without exceeding max', async () => {
    const { getByTestId } = renderCustomInputNumber()
    const incrementButton = getByTestId('increment-button')
    fireEvent.mouseDown(incrementButton)

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 200)))

    fireEvent.mouseUp(incrementButton)

    await waitFor(() => {
      expect(mockOnInputChange).toHaveBeenCalledTimes(2)
      expect(mockOnInputChange).toHaveBeenCalledWith(
        testData.value + testData.step * 2
      )
    })
  })

  it('should not exceed max value on long press increment when already at max', async () => {
    const { getByTestId } = renderCustomInputNumber()

    const incrementButton = getByTestId('increment-button')

    fireEvent.mouseDown(incrementButton)

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 800)))

    fireEvent.mouseUp(incrementButton)

    await waitFor(() => {
      expect(mockOnInputChange).toHaveBeenCalledTimes(2)
      expect(mockOnInputChange).toHaveBeenCalledWith(testData.max)
    })
  })

  it('should handle long press decrement correctly without going below min', async () => {
    const { getByTestId } = renderCustomInputNumber()
    const decrementButton = getByTestId('decrement-button')
    fireEvent.mouseDown(decrementButton)

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 200)))

    fireEvent.mouseUp(decrementButton)

    await waitFor(() => {
      expect(mockOnInputChange).toHaveBeenCalledTimes(2)
      expect(mockOnInputChange).toHaveBeenCalledWith(
        testData.value - testData.step * 2
      )
    })
  })

  it('should not going below min on long press decrement when already at min', async () => {
    const { getByTestId } = renderCustomInputNumber()

    const decrementButton = getByTestId('decrement-button')

    fireEvent.mouseDown(decrementButton)

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 600)))

    fireEvent.mouseUp(decrementButton)

    await waitFor(() => {
      expect(mockOnInputChange).toHaveBeenCalledTimes(2)
      expect(mockOnInputChange).toHaveBeenCalledWith(testData.min)
    })
  })
})
