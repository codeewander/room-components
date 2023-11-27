import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import CustomInputNumber, { CustomInputNumberProps } from './CustomInputNumber'
import '@testing-library/jest-dom'

describe('CustomInputNumber', () => {
  const mockOnChange = jest.fn()
  const mockOnBlur = jest.fn()

  const testData: CustomInputNumberProps = {
    min: 0,
    max: 4,
    step: 1,
    name: 'test',
    value: 3,
    disabled: false,
    onChange: mockOnChange,
    onBlur: mockOnBlur,
  }

  it('renders with minimum required props', () => {
    const { getByTestId } = render(<CustomInputNumber {...testData} />)
    const inputElement = getByTestId('custom-input-number')

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('min', '0')
    expect(inputElement).toHaveAttribute('max', '4')
    expect(inputElement).toHaveAttribute('step', '1')
    expect(inputElement).toHaveAttribute('name', 'test')
    expect(inputElement).toHaveAttribute('value', '3')
    expect(inputElement).not.toHaveAttribute('disabled')
  })
})
