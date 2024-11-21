import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            
            <h2>Farmacia</h2>
            <div className="button-container">
                <button onClick={() => navigate('/create')}>Ingresar nuevo medicamento</button>
                <button onClick={() => navigate('/ver-tareas')}>Ver Todas los medicamentos</button>
            </div>
        </div>
    );
}

export default Home;