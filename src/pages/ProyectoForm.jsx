import React, { useState } from 'react';
import './ProyectoForm.css';

const ProyectoForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock: 0,
        descripcion: '',
        fechaExpiracion: '',
        estatusPago: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/api/to-do/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                alert('Registro creado con éxito.');
                setFormData({
                    nombre: '',
                    precio: '',
                    stock: 0,
                    descripcion: '',
                    fechaExpiracion: '',
                    estatusPago: false,
                });
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert('Error al crear el registro.');
        }
    };

    return (
        <div className="proyecto-form-container">
            <h1>Crear Nuevo Registro</h1>
            <form className="proyecto-form" onSubmit={handleSubmit}>
                <div className="form-column">
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Precio:
                        <input
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Stock:
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                        />
                    </label>
                    <label>
                        Fecha de Expiración:
                        <input
                            type="date"
                            name="fechaExpiracion"
                            value={formData.fechaExpiracion}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-column">
                    <label>
                        Descripción:
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="checkbox">
                        ¿Pagado?
                        <input
                            type="checkbox"
                            name="estatusPago"
                            checked={formData.estatusPago}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Crear nuevo medicamento</button>
                <button type="button" onClick={() => window.history.back()}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default ProyectoForm;
