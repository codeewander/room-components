import { useState } from 'react'
import RoomAllocation from './RoomAllocation'

const App = () => {
  const [guest, setGuest] = useState(10)
  const [room, setRoom] = useState(3)

  return (
    <div>
      <RoomAllocation
        guest={guest}
        room={room}
        onChange={(result) => {
          console.log(result, 'result')
        }}
      />
    </div>
  )
}

export default App
