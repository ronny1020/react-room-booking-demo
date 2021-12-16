import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classes from './CustomInputNumber.module.scss'

interface CustomInputNumberProps {
  value: number | ''
  onChange: (value: number | '') => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

function isNumberString(str: string): boolean {
  return /^\d+$/.test(str)
}

export default function CustomInputNumber({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
}: CustomInputNumberProps) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)
  const [pressState, setPressState] = useState<'add' | 'sub' | null>(null)

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value
    if (inputValue === '') {
      onChange('')
    }

    if (isNumberString(inputValue)) {
      const newValue = Number(inputValue)
      if (min !== undefined && newValue < min) {
        onChange(min)
        return
      }
      if (max !== undefined && newValue > max) {
        onChange(max)
        return
      }
      onChange(newValue)
    }
  }

  const handleAdd = useCallback(() => {
    if (disabled) return

    if (value === '') {
      onChange(step)
      return
    }
    if (value + step > max) {
      onChange(max)
      return
    }

    onChange(value + step)
  }, [value, step, max, onChange, disabled])

  const handleLongPressAdd = useCallback(() => {
    if (disabled) return

    handleAdd()
    setPressState('add')
  }, [disabled, handleAdd])

  const addDisabled = useMemo(
    () => disabled || value === max,
    [disabled, value, max]
  )

  const handleSub = useCallback(() => {
    if (disabled) return

    if (disabled) return
    if (value === '') {
      onChange(-step)
      return
    }
    if (value - step < min) {
      onChange(min)
      return
    }
    onChange(value - step)
  }, [value, step, min, onChange, disabled])

  const handleLongPressSub = useCallback(() => {
    if (disabled) return

    handleSub()
    setPressState('sub')
  }, [disabled, handleSub])

  const subDisabled = useMemo(
    () => disabled || value === min,
    [disabled, value, min]
  )

  const handleLongPressCancel = useCallback(() => {
    setPressState(null)
  }, [])

  useEffect(() => {
    if (subDisabled || addDisabled) {
      setPressState(null)
    }
  }, [subDisabled, addDisabled])

  useEffect(() => {
    if (pressState === 'add') {
      setIntervalId(setInterval(handleAdd, 300))
    }
    if (pressState === 'sub') {
      setIntervalId(setInterval(handleSub, 300))
    }
    if (pressState === null && intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [handleAdd, handleSub, pressState])

  return (
    <div className={classes.input_wrapper}>
      <button
        type="button"
        className={classes.button}
        disabled={subDisabled}
        onMouseDown={handleLongPressSub}
        onMouseUp={handleLongPressCancel}
        onMouseLeave={handleLongPressCancel}
        onTouchStart={handleLongPressSub}
        onTouchEnd={handleLongPressCancel}
      >
        -
      </button>
      <input
        className={classes.input}
        value={value}
        onChange={onInputChange}
        disabled={disabled}
      />
      <button
        type="button"
        className={[classes.button, classes.button_dark].join(' ')}
        disabled={addDisabled}
        onMouseDown={handleLongPressAdd}
        onMouseUp={handleLongPressCancel}
        onMouseLeave={handleLongPressCancel}
        onTouchStart={handleLongPressAdd}
        onTouchEnd={handleLongPressCancel}
      >
        +
      </button>
    </div>
  )
}
