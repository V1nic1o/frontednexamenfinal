import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProyectoForm from './pages/ProyectoForm'
import Home from './pages/Home'
import TareasPage from './pages/TareasPage'
import './App.css'

function App() {

  return (
    <Router>
    {/*   <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<ProyectoForm />} />
        <Route path="/ver-tareas" element={<TareasPage />} />
      </Routes>
    </Router>
  )
}

export default App
