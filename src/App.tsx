import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Info from '@/pages/Info'
import './App.css'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </main>
  )
}

export default App
