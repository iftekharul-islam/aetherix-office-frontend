'use client'

import { useSelector } from 'react-redux'

export default function Page() {
  const count = useSelector(state => state.counter.value)
  const { user } = useSelector(state => state.userSlice)

  console.log({ count })
  console.log({ user })

  return <h1>About page!</h1>
}
