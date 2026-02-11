import { RouterProvider } from 'react-router-dom'
import {router} from './providers/router'
import { QueryProvider } from './providers/query'


function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

export default App
