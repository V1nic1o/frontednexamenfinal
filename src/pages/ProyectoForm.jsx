import React, { useState } from 'react';
import './ProyectoForm.css';

const ProyectoForm = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        completada: false,
        fecha_vencimiento: '',
        prioridad: 'media',
        asignado_a: '',
        categoria: '',
        costo_proyecto: '',
        pagado: false,
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
        // Aquí se envían los datos al backend
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Error al crear el proyecto.');
        }
    };

    return (
        <div className="proyecto-form-container">
            <h1>Crear Nuevo Proyecto</h1>
            <form className="proyecto-form" onSubmit={handleSubmit}>
                <div className="form-column">
                    <label>
                        Título:
                        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                    </label>
                    <label>
                        Fecha de vencimiento:
                        <input type="date" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} />
                    </label>
                    <label>
                        Prioridad:
                        <select name="prioridad" value={formData.prioridad} onChange={handleChange}>
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                    </label>
                    <label>
                        Asignado a:
                        <input type="text" name="asignado_a" value={formData.asignado_a} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-column">
                    <label>
                        Descripción:
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
                    </label>
                    <label>
                        Categoría:
                        <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} />
                    </label>
                    <label>
                        Costo del proyecto:
                        <input type="number" name="costo_proyecto" value={formData.costo_proyecto} onChange={handleChange} required />
                    </label>
                    <label className="checkbox">
                        Pagado:
                        <input type="checkbox" name="pagado" checked={formData.pagado} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">Crear Proyecto</button>
                <button type="button" onClick={() => window.history.back()}>Cancelar</button>
            </form>
        </div>
    );
};

export default ProyectoForm;
