import React from 'react'
import CustomInputNumber from './component/CustomInputNumber/CustomInputNumber'

export default function App() {
  const [value, setValue] = React.useState<number | ''>(0)

  return (
    <>
      <h1>Hello World</h1>
      <CustomInputNumber value={value} onChange={setValue} />
    </>
  )
}
