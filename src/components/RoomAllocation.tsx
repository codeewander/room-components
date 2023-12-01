import React, { useState, useMemo } from 'react'
import CustomInputNumber from './CustomInputNumber'

export interface Allocation {
  adult: number
  child: number
}

interface RoomAllocationProps {
  guest: number
  room: number
  onChange: (result: Allocation[]) => void
}
const RoomAllocation: React.FC<RoomAllocationProps> = ({
  guest,
  room,
  onChange,
}) => {
  const [roomAllocations, setRoomAllocations] = useState<Allocation[]>(
    Array(room).fill({ adult: 1, child: 0 })
  )
  const CAPACITY_PRE_ROOM = 4
  const STEP = 1

  const unAllocatedGuests = useMemo(() => {
    return (
      guest -
      roomAllocations.reduce((acc, cur) => {
        return acc + cur.adult + cur.child
      }, 0)
    )
  }, [roomAllocations, guest])

  const calculateMaxValue = (
    remainingGuests: number,
    { adult, child }: Allocation,
    type: string
  ): number => {
    const [minusNumber, addedNumber] =
      type === 'adult' ? [child, adult] : [adult, child]
    const maxCapacityPerRoom = CAPACITY_PRE_ROOM - minusNumber

    return Math.min(remainingGuests + addedNumber, maxCapacityPerRoom)
  }

  const handleAllocationChange = (
    index: number,
    type: string,
    inputNumber: number
  ) => {
    const newAllocations = [...roomAllocations]
    newAllocations[index] = {
      ...newAllocations[index],
      [type]: inputNumber,
    }
    setRoomAllocations(newAllocations)
    onChange(newAllocations)
  }

  return (
    <div className="flex flex-col gap-3 p-2">
      <h2 className="section-title">
        住客人數：{guest} 人 / {room} 房
      </h2>
      <div className="info-block">尚未分配人數：{unAllocatedGuests} 人</div>
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
            <CustomInputNumber
              name={`room-${index + 1}-adult`}
              min={1}
              max={calculateMaxValue(unAllocatedGuests, allocation, 'adult')}
              step={STEP}
              handelInputChange={(inputNumber) => {
                handleAllocationChange(index, 'adult', inputNumber)
              }}
              value={allocation.adult}
              onBlur={(e) => console.log(e)}
              onChange={(e) => {
                console.log(e)
              }}
              disabled={unAllocatedGuests === 0}
            />
          </div>
          <div className="flex justify-between">
            <h4 className="selector-title">小孩</h4>
            <CustomInputNumber
              name={`room-${index + 1}-child`}
              min={0}
              max={calculateMaxValue(unAllocatedGuests, allocation, 'child')}
              step={STEP}
              handelInputChange={(inputNumber) => {
                handleAllocationChange(index, 'child', inputNumber)
              }}
              onChange={(e) => {
                console.log(e)
              }}
              onBlur={(e) => console.log(e)}
              value={allocation.child}
              disabled={unAllocatedGuests === 0}
            />
          </div>
          {index !== room - 1 && <hr className="divider" />}
        </div>
      ))}
    </div>
  )
}

export default RoomAllocation
