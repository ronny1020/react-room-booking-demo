import React from 'react'
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

function CustomInputNumber({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
}: CustomInputNumberProps) {
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

  function handleClickAdd() {
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
  }

  function handleClickSub() {
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
  }

  return (
    <div className={classes.input_wrapper}>
      <button
        type="button"
        className={classes.button}
        onClick={handleClickSub}
        disabled={disabled}
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
        onClick={handleClickAdd}
        disabled={disabled}
      >
        +
      </button>
    </div>
  )
}

export default CustomInputNumber
