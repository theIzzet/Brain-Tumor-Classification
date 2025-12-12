import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BrainTumorDetector from './Pages/BrainTumorDetector'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <BrainTumorDetector />
      </div>
    </>
  )
}

export default App
