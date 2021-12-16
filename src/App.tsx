import React from 'react'
import RoomAllocation from './components/RoomAllocation/RoomAllocation'
import './style.scss'

export default function App() {
  return (
    <>
      <h1>Room Booking</h1>
      <RoomAllocation
        guest={10}
        room={3}
        // eslint-disable-next-line no-console
        onChange={(result) => console.log(result)}
      />
    </>
  )
}
