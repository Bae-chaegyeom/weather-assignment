import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import {router} from './providers/router'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
