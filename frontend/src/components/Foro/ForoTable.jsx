import React from 'react';

export default function ForoTable({ foros, onDelete, loadingDelete, onUpdate }) {
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
                            <button onClick={() => onUpdate(foro)} className="mr-2">
                                Actualizar
                            </button>
                            <button 
                                onClick={() => onDelete(foro.id)} 
                                disabled={loadingDelete}
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
