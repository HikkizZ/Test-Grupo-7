import { useState } from 'react';

function ForoForm({ onCreate, loading, onCancel }) {
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
        
        // seteo de campos
        setTitulo('');
        setNombreProfesor('');
        setCategoria('');
        setFecha('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título:</label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="nombreProfesor" className="block text-sm font-medium text-gray-700">Nombre del Profesor:</label>
                <input
                    id="nombreProfesor"
                    type="text"
                    value={nombreProfesor}
                    onChange={(e) => setNombreProfesor(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría:</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">--Seleccionar--</option>
                    <option value="Tarea">Tarea</option>
                    <option value="Contenido">Contenido</option>
                    <option value="Variedad">Variedad</option>
                </select>
            </div>
            <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha:</label>
                <input
                    id="fecha"
                    type="date"
                    value={fecha}
                    onChange={handleFechaChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="flex justify-end space-x-2">
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                >
                    {loading ? 'Creando...' : 'Crear Foro'}
                </button>
            </div>
        </form>
    );
}

export default ForoForm;

