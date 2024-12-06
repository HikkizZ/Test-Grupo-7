import React, { useState, useEffect } from 'react';

function UpdateForoForm({ foro, onUpdate, onCancel }) {
    const [titulo, setTitulo] = useState(foro.titulo);
    const [nombreProfesor, setNombreProfesor] = useState(foro.nombreProfesor);
    const [categoria, setCategoria] = useState(foro.categoria);
    const [fecha, setFecha] = useState(foro.fecha);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(foro.id, { titulo, nombreProfesor, categoria, fecha });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título"
                required
            />
            <input
                type="text"
                value={nombreProfesor}
                onChange={(e) => setNombreProfesor(e.target.value)}
                placeholder="Nombre del Profesor"
                required
            />
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
            >
                <option value="">Seleccionar categoría</option>
                <option value="Tarea">Tarea</option>
                <option value="Contenido">Contenido</option>
                <option value="Variedad">Variedad</option>
            </select>
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
            />
            <button type="submit">Actualizar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
}

export default UpdateForoForm;
