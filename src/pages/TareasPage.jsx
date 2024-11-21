import React, { useState, useEffect } from 'react';
import './TareasPage.css';

const TareasPage = () => {
    const [tareas, setTareas] = useState([]);
    const [selectedTarea, setSelectedTarea] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Obtener todas las tareas desde el backend
    useEffect(() => {
        fetch('http://localhost:8081/api/to-do/all')
            .then(response => response.json())
            .then(data => setTareas(data))
            .catch(error => console.error('Error al obtener las tareas:', error));
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

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/to-do/update/${selectedTarea.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedTarea),
            });
            const result = await response.json();

            if (response.ok) {
                setTareas(tareas.map(tarea => tarea.id === result.id ? result : tarea));
                setIsEditing(false);
                alert('Registro actualizado con éxito.');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error al actualizar el registro:', error);
            alert('Error al actualizar el registro.');
        }
    };

    const handleDeleteTarea = async (tarea) => {
        try {
            const response = await fetch(`http://localhost:8081/api/to-do/delete/${tarea.id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                setTareas(tareas.filter((t) => t.id !== tarea.id));
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Error al eliminar la tarea.');
        }
    };

    return (
        <div className="tareas-page">
            <button onClick={() => window.history.back()}>Volver</button>
            <h2>Lista de productos</h2>
            <div className="tareas-grid">
                {tareas.map((tarea) => (
                    <div
                        key={tarea.id}
                        className="tarea-card"
                        onClick={() => handleTareaClick(tarea)}
                    >
                        <h3>{tarea.nombre}</h3>
                        <p>Precio: Q{tarea.precio}</p>
                        <p>Stock: {tarea.stock}</p>
                        <p>Vencimiento: {tarea.fechaExpiracion ? new Date(tarea.fechaExpiracion).toLocaleDateString() : 'Sin fecha'}</p>
                    </div>
                ))}
            </div>

            {selectedTarea && (
                <div className="tarea-detail-overlay" onClick={handleCloseDetail}>
                    <div className="tarea-detail" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedTarea.nombre}</h2>

                        {isEditing ? (
                            <div>
                                <label>
                                    Nombre:
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={selectedTarea.nombre}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Precio:
                                    <input
                                        type="number"
                                        name="precio"
                                        value={selectedTarea.precio}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Stock:
                                    <input
                                        type="number"
                                        name="stock"
                                        value={selectedTarea.stock}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Fecha de Expiración:
                                    <input
                                        type="date"
                                        name="fechaExpiracion"
                                        value={selectedTarea.fechaExpiracion ? new Date(selectedTarea.fechaExpiracion).toISOString().split('T')[0] : ''}
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
                                <div className="tarea-actions">
                                    <button className="save-button" onClick={handleUpdate}>Guardar</button>
                                    <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Precio:</strong> Q{selectedTarea.precio}</p>
                                <p><strong>Stock:</strong> {selectedTarea.stock}</p>
                                <p><strong>Descripción:</strong> {selectedTarea.descripcion}</p>
                                <p><strong>Vencimiento:</strong> {selectedTarea.fechaExpiracion ? new Date(selectedTarea.fechaExpiracion).toLocaleDateString() : 'Sin fecha'}</p>
                                <div className="tarea-actions">
                                    <button className="edit-button" onClick={handleEditClick}>Editar</button>
                                    <button className="delete-button" onClick={() => handleDeleteTarea(selectedTarea)}>Eliminar</button>
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
