import { useState } from 'react';

function ForoForm({ onCreate, loading }) {
    const [titulo, setTitulo] = useState('');
    const [nombreProfesor, setNombreProfesor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');

    const handleFechaChange = (event) => {
        const selectedDate = event.target.value; // Formato recibido: YYYY-MM-DD
        setFecha(selectedDate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Convertir fecha a DD/MM/YYYY antes de enviarla
        const [year, month, day] = fecha.split("-");
        const formattedDate = `${day}/${month}/${year}`;

        // Datos a enviar
        const foroData = {
            titulo,
            nombreProfesor,
            categoria,
            fecha: formattedDate,
        };

        onCreate(foroData); // Llamada al método para crear el foro
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="titulo">Título:</label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="nombreProfesor">Nombre del Profesor:</label>
                <input
                    id="nombreProfesor"
                    type="text"
                    value={nombreProfesor}
                    onChange={(e) => setNombreProfesor(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="categoria">Categoría:</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="">--Seleccionar--</option>
                    <option value="Tarea">Tarea</option>
                    <option value="Contenido">Contenido</option>
                    <option value="Variedad">Variedad</option>
                </select>
            </div>
            <div>
                <label htmlFor="fecha">Fecha:</label>
                <input
                    id="fecha"
                    type="date"
                    value={fecha}
                    onChange={handleFechaChange}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Cargando...' : 'Crear Foro'}
            </button>
        </form>
    );
}

export default ForoForm;
