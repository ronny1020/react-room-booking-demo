import React, { useMemo, useState } from 'react'
import CustomRoom from '../CustomRoom/CustomRoom'
import { CustomRoomMembers } from '../CustomRoom/CustomRoom.domain'
import classes from './RoomAllocation.module.scss'

interface RoomAllocationProps {
  guest: number
  room: number
  onChange: (value: CustomRoomMembers[]) => void
}

export default function RoomAllocation({
  guest,
  room,
  onChange,
}: RoomAllocationProps) {
  const [allocatedRoom, setAllocatedRoom] = useState<CustomRoomMembers[]>(
    [...Array(room)].map((): CustomRoomMembers => ({ adult: 1, child: 0 }))
  )

  const restGuest = useMemo(
    () =>
      guest -
      allocatedRoom.reduce((acc, { adult, child }) => acc + adult + child, 0),
    [guest, allocatedRoom]
  )

  function handleRoomChange(
    changedRoomMembers: CustomRoomMembers,
    index: number
  ) {
    const newCustomRoomMembers = [...allocatedRoom]
    newCustomRoomMembers[index] = changedRoomMembers
    setAllocatedRoom(newCustomRoomMembers)
    onChange(newCustomRoomMembers)
  }

  return (
    <div className={classes.room_allocation_wrapper}>
      <h2>
        住客人數: {guest} 人 / {room} 房
      </h2>
      <div className={classes.restNumber}>尚未分配人數: {restGuest} 人</div>
      {allocatedRoom.map((customRoomMember, index) => (
        <CustomRoom
          value={customRoomMember}
          onChange={(value) => handleRoomChange(value, index)}
          key={index}
          max={Math.min(
            4,
            restGuest + customRoomMember.adult + customRoomMember.child
          )}
        />
      ))}
    </div>
  )
}
