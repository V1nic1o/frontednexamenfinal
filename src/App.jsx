import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProyectoForm from './pages/ProyectoForm';
import Home from './pages/Home';
import TareasPage from './pages/TareasPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta inicial: muestra un listado de tareas o una introducción */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para crear un nuevo registro */}
        <Route path="/create" element={<ProyectoForm />} />
        
        {/* Ruta para ver y gestionar todas las tareas */}
        <Route path="/ver-tareas" element={<TareasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
