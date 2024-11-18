import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            
            <h2>Listado</h2>
            <div className="button-container">
                <button onClick={() => navigate('/create')}>Ingresar y Crear Nueva Tarea</button>
                <button onClick={() => navigate('/ver-tareas')}>Ver Todas las Tareas</button>
            </div>
        </div>
    );
}

export default Home;