import React from 'react'
import CustomInputNumber from '../CustomInputNumber/CustomInputNumber'
import { CustomRoomMembers } from './CustomRoom.domain'
import classes from './customRoom.module.scss'

interface CustomRoomProps {
  value: CustomRoomMembers
  onChange: (value: CustomRoomMembers) => void
  max?: number
}

export default function CustomRoom({
  value: { adult, child },
  onChange,
  max = Infinity,
}: CustomRoomProps) {
  const setAdult = (newAdult: number | '') => {
    if ((newAdult || 0) + child > max) {
      return
    }
    onChange({
      adult: newAdult || 0,
      child,
    })
  }

  const setChild = (newChild: number | '') => {
    if ((newChild || 0) + adult > max) {
      return
    }
    onChange({
      child: newChild || 0,
      adult,
    })
  }

  return (
    <div className={classes.custom_room_wrapper}>
      <div className={classes.member_type}>
        <div className={classes.member_type_text}>
          <div className={classes.member_type_title}>大人</div>
          <div className={classes.member_type_subtitle}>年齡 20+</div>
        </div>
        <CustomInputNumber
          value={adult}
          onChange={setAdult}
          min={1}
          max={max - child}
        />
      </div>
      <div className={classes.member_type}>
        <div className={classes.member_type_text}>
          <div className={classes.member_type_title}>小孩</div>
        </div>
        <CustomInputNumber
          value={child}
          onChange={setChild}
          max={max - adult}
        />
      </div>
    </div>
  )
}
