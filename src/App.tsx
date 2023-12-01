import React, { useState } from 'react'
import RoomAllocation from './components/RoomAllocation'

const App: React.FC = () => {
  const [guest, setGuest] = useState(10)
  const [room, setRoom] = useState(4)

  return (
    <RoomAllocation
      guest={guest}
      room={room}
      onChange={(result) => console.log(result)}
    />
  )
}

export default App
