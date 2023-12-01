import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import RoomAllocation from './RoomAllocation'

describe('RoomAllocation Component', () => {
  const mockOnChange = jest.fn()
  beforeEach(() => {
    render(<RoomAllocation guest={6} room={2} onChange={mockOnChange} />)
  })

  it('renders with default values', () => {
    expect(screen.getByText('住客人數：6 人 / 2 房')).toBeInTheDocument()
    expect(screen.getByText('尚未分配人數：4 人')).toBeInTheDocument()
    expect(screen.getAllByText('房間: 1 人')).toHaveLength(2)

    const adultInputElement1 = screen.getByRole('spinbutton', {
      name: /room-1-adult/i,
    })

    const childInputElement1 = screen.getByRole('spinbutton', {
      name: /room-1-child/i,
    })

    expect(adultInputElement1).toHaveValue(1)
    expect(childInputElement1).toHaveValue(0)

    const adultInputElement2 = screen.getByRole('spinbutton', {
      name: /room-2-adult/i,
    })
    const childInputElement2 = screen.getByRole('spinbutton', {
      name: /room-2-child/i,
    })
    expect(adultInputElement2).toHaveValue(1)
    expect(childInputElement2).toHaveValue(0)
  })

  it('updates allocation on customInputValue change', () => {
    const adultInputElement1 = screen.getByRole('spinbutton', {
      name: /room-1-adult/i,
    })

    fireEvent.change(adultInputElement1, {
      target: { value: 2 },
    })

    expect(adultInputElement1).toHaveValue(2)

    const childInputElement2 = screen.getByRole('spinbutton', {
      name: /room-2-child/i,
    })
    fireEvent.change(childInputElement2, {
      target: { value: 1 },
    })

    expect(childInputElement2).toHaveValue(1)
  })
})
