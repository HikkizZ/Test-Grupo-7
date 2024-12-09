import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForoTable({ foros, onDelete, loadingDelete, onUpdate }) {
    const navigate = useNavigate();

    if (foros.length === 0) {
        return <p>No se encontraron foros que coincidan con la búsqueda.</p>;
    }
    
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Profesor</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {foros.map((foro) => (
                    <tr key={foro.id}>
                        <td>{foro.id}</td>
                        <td>{foro.titulo}</td>
                        <td>{foro.nombreProfesor}</td>
                        <td>{foro.categoria}</td>
                        <td>{foro.fecha}</td>
                        <td>
                            <button 
                                onClick={() => navigate(`/post/${foro.id}`)} 
                                className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                            >
                                Ver
                            </button>
                            <button 
                                onClick={() => onUpdate(foro)} 
                                className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
                            >
                                Actualizar
                            </button>
                            <button 
                                onClick={() => onDelete(foro.id)} 
                                disabled={loadingDelete}
                                className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                            >
                                {loadingDelete ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

