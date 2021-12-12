import React, { useState } from 'react'
import CustomRoom from './component/CustomRoom/CustomRoom'
import { CustomRoomMembers } from './component/CustomRoom/CustomRoom.domain'
import './App.scss'

export default function App() {
  const [result, setResult] = useState<CustomRoomMembers>({
    adult: 1,
    child: 0,
  })

  return (
    <>
      <h1>Room Booking</h1>
      <CustomRoom value={result} onChange={setResult} />
    </>
  )
}
