import { useState, useMemo, useEffect } from 'react'
import QuantitySelector from './components/QuantitySelector'

interface Allocation {
  adult: number
  child: number
}

interface RoomAllocationProps {
  guest: number
  room: number
  onChange: (result: Allocation[]) => void
}
function RoomAllocation(props: RoomAllocationProps) {
  const { guest, room, onChange } = props
  const [roomAllocations, setRoomAllocations] = useState<Allocation[]>(
    Array(room).fill({ adult: 1, child: 0 })
  )
  const calculateMaxValue = (
    remainingGuests: number,
    allocation: Allocation,
    type: string
  ): number => {
    const { adult, child } = allocation
    const [minusNumber, addedNumber] =
      type === 'adult' ? [child, adult] : [adult, child]
    const maxCapacityPerRoom = 4 - minusNumber

    return Math.min(remainingGuests + addedNumber, maxCapacityPerRoom)
  }

  const totalGuests = useMemo(() => {
    return roomAllocations.reduce((acc, cur) => {
      return acc + cur.adult + cur.child
    }, 0)
  }, [roomAllocations])

  const handleAllocationChange = (
    index: number,
    type: string,
    inputNumber: number
  ) => {
    const newAllocations = [...roomAllocations]
    newAllocations[index] = { ...newAllocations[index], [type]: inputNumber }
    setRoomAllocations(newAllocations)
  }

  useEffect(() => {
    if (totalGuests <= guest) {
      onChange([...roomAllocations])
    }
  }, [roomAllocations, guest, onChange, totalGuests])

  return (
    <div className="flex flex-col gap-3 p-2">
      <h2 className="section-title">
        住客人數：{guest} 人 / {room} 房
      </h2>
      <div className="info-block">尚未分配人數：{guest - totalGuests} 人</div>
      {roomAllocations.map((allocation, index) => (
        <div className="flex flex-col gap-3" key={index}>
          <h3 className="section-title">
            房間: {allocation.adult + allocation.child} 人
          </h3>
          <div className="flex justify-between">
            <div>
              <h4 className="selector-title">大人</h4>
              <span className="selector-description">年齡 20+</span>
            </div>
            <QuantitySelector
              name={`room-${index}-adult`}
              min={1}
              max={calculateMaxValue(guest - totalGuests, allocation, 'adult')}
              handleChange={(inputNumber) =>
                handleAllocationChange(index, 'adult', inputNumber)
              }
              value={allocation.adult}
            />
          </div>
          <div className="flex justify-between">
            <h4 className="selector-title">小孩</h4>
            <QuantitySelector
              name={`room-${index}-child`}
              min={0}
              max={calculateMaxValue(guest - totalGuests, allocation, 'child')}
              handleChange={(inputNumber) =>
                handleAllocationChange(index, 'child', inputNumber)
              }
              value={allocation.child}
            />
          </div>
          {index !== roomAllocations.length && <hr className="divider" />}
        </div>
      ))}
    </div>
  )
}

export default RoomAllocation
