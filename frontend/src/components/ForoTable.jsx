import React from 'react';

export default function ForoTable({ foros, onDelete, loadingDelete, onUpdate, loadingUpdate }) {
    return (
        <table>
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
                        {/* Muestra los datos correspondientes del foro */}
                        <td>{foro.id}</td>
                        <td>{foro.titulo}</td>
                        <td>{foro.nombreProfesor}</td>
                        <td>{foro.categoria}</td>
                        <td>{foro.fecha}</td>
                        <td>
                            {/* Botón de actualización */}
                            <button 
                                onClick={() => onUpdate(foro)} 
                                disabled={loadingUpdate}
                            >
                                {loadingUpdate ? 'Actualizando...' : 'Actualizar'}
                            </button>
                            
                            {/* Botón de eliminación */}
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
