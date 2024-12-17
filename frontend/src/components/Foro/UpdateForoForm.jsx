import React, { useState, useEffect } from 'react';

function UpdateForoForm({ foro, onUpdate, onCancel, loading }) {
    const [titulo, setTitulo] = useState(foro.titulo);
    const [contenido, setContenido] = useState(foro.contenido);
    const [categoria,setCategoria] = useState(foro.categoria);
    const [archivo, setArchivo] = useState(null);
    const [level, setLevel] = useState(foro.level);
    const [section,setSection] = useState (foro.state);

    useEffect(() => {
        setTitulo(foro.titulo);
        setContenido(foro.contenido);
    }, [foro]);

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('contenido', contenido);
        formData.append('categoria', categoria);
        formData.append('level', level );
        formData.append('section', section)
        if (archivo) {
            formData.append('archivos', archivo);
        }

        onUpdate(foro.id, formData);
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
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria:</label>
                <textarea
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">Nivel:</label>
                <textarea
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">Seccion:</label>
                <textarea
                    id="section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="contenido" className="block text-sm font-medium text-gray-700">Contenido:</label>
                <textarea
                    id="contenido"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="archivo" className="block text-sm font-medium text-gray-700">Archivo adjunto:</label>
                <input
                    id="archivo"
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full"
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

