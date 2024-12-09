import React, { useState, useEffect } from 'react';

function UpdateForoForm({ foro, onUpdate, onCancel, loading }) {
    const [titulo, setTitulo] = useState(foro.titulo);
    const [nombreProfesor, setNombreProfesor] = useState(foro.nombreProfesor);
    const [categoria, setCategoria] = useState(foro.categoria);
    const [fecha, setFecha] = useState(foro.fecha);

    useEffect(() => {
        setTitulo(foro.titulo);
        setNombreProfesor(foro.nombreProfesor);
        setCategoria(foro.categoria);
        setFecha(foro.fecha);
    }, [foro]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(foro.id, { 
            titulo, 
            nombreProfesor, 
            categoria,
            fecha // Include the original fecha
        });
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
                    <option value="">Seleccionar categoría</option>
                    <option value="Tarea">Tarea</option>
                    <option value="Contenido">Contenido</option>
                    <option value="Variedad">Variedad</option>
                </select>
            </div>
            <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha:</label>
                <input
                    id="fecha"
                    type="text"
                    value={fecha}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100"
                />
            </div>
            <div className="flex justify-end space-x-2">
                <button 
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                >
                    {loading ? 'Actualizando...' : 'Actualizar'}
                </button>
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default UpdateForoForm;

