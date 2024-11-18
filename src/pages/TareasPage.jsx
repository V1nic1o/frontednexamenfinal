import React, { useState, useEffect } from 'react';
import './TareasPage.css';

const TareasPage = () => {
    const [tareas, setTareas] = useState([]);
    const [selectedTarea, setSelectedTarea] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Simula la obtención de tareas desde la API
    useEffect(() => {
        fetch('')
            .then(response => response.json())
            .then(data => setTareas(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleTareaClick = (tarea) => {
        setSelectedTarea(tarea);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCloseDetail = () => {
        setSelectedTarea(null);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedTarea({ ...selectedTarea, [name]: value });
    };

    const handleUpdate = () => {
        fetch(`/${selectedTarea.id_proyecto}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedTarea),
        })
            .then(response => response.json())
            .then(data => {
                setTareas(tareas.map(tarea => tarea.id_proyecto === data.id_proyecto ? data : tarea));
                setIsEditing(false);
                alert("Tarea actualizada con éxito");
            })
            .catch(error => console.error('Error updating task:', error));
    };

    const handleDeleteTarea = async (tarea) => {
        try {
            const response = await fetch(`https://examen-final-desarrollo-web-backend.onrender.com/api/to-do/delete/${tarea.id_proyecto}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                setTareas(tareas.filter((t) => t.id_proyecto !== tarea.id_proyecto));
            } else {
                alert(result.message);
            }
        }
        catch (error) {
            alert('Error al eliminar la tarea.');
        }
    }

    return (
        <div className="tareas-page">
            <button onClick={() => window.history.back()}>Volver</button>
            <h2>Lista de Tareas</h2>
            <div className="tareas-grid">
                {tareas.map((tarea) => (
                    <div
                        key={tarea.id_proyecto}
                        className="tarea-card"
                        onClick={() => handleTareaClick(tarea)}
                    >
                        <h3>{tarea.titulo}</h3>
                        <p>Prioridad: {tarea.prioridad}</p>
                        <p>Vencimiento: {new Date(tarea.fecha_vencimiento).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {selectedTarea && (
                <div className="tarea-detail-overlay" onClick={handleCloseDetail}>
                    <div className="tarea-detail" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedTarea.titulo}</h2>

                        {isEditing ? (
                            <div>
                                <label>
                                    Título:
                                    <input
                                        type="text"
                                        name="titulo"
                                        value={selectedTarea.titulo}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Descripción:
                                    <textarea
                                        name="descripcion"
                                        value={selectedTarea.descripcion}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Asignado a:
                                    <input
                                        type="text"
                                        name="asignado_a"
                                        value={selectedTarea.asignado_a}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Prioridad:
                                    <select
                                        name="prioridad"
                                        value={selectedTarea.prioridad}
                                        onChange={handleInputChange}
                                    >
                                        <option value="baja">Baja</option>
                                        <option value="media">Media</option>
                                        <option value="alta">Alta</option>
                                    </select>
                                </label>
                                <label>
                                    Fecha de Vencimiento:
                                    <input
                                        type="date"
                                        name="fecha_vencimiento"
                                        value={new Date(selectedTarea.fecha_vencimiento).toISOString().split('T')[0]}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Costo del Proyecto:
                                    <input
                                        type="number"
                                        name="costo_proyecto"
                                        value={selectedTarea.costo_proyecto}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <div className="tarea-actions">
                                    <button className="save-button" onClick={handleUpdate}>Guardar</button>
                                    <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Descripción:</strong> {selectedTarea.descripcion}</p>
                                <p><strong>Asignado a:</strong> {selectedTarea.asignado_a}</p>
                                <p><strong>Prioridad:</strong> {selectedTarea.prioridad}</p>
                                <p><strong>Fecha de Creación:</strong> {new Date(selectedTarea.fecha_creacion).toLocaleDateString()}</p>
                                <p><strong>Fecha de Vencimiento:</strong> {new Date(selectedTarea.fecha_vencimiento).toLocaleDateString()}</p>
                                <p><strong>Costo:</strong> Q{selectedTarea.costo_proyecto}</p>
                                <p><strong>Pagado:</strong> {selectedTarea.pagado ? 'Sí' : 'No'}</p>
                                <div className="tarea-actions">
                                    <button className="edit-button" onClick={handleEditClick}>Editar</button>
                                    <button className="delete-button" onClick={() => handleDeleteTarea(selectedTarea)}>Eliminar</button>
                                    <button onClick={() => window.history.back()}>Volver</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TareasPage;
