import { useState } from 'react'
import Manager from './Components/manager'
import Navbar from './Components/navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <>
     <Navbar />
     <Manager />  
     </>
  )
}

export default App
