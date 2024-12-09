import React from 'react';

export default function ForoView({ foro, onClose }) {
    if (!foro) return null;

    return (
        <div className="w-full max-w-md mx-auto mt-4 border rounded-lg p-4 bg-white shadow">
            <h2 className="text-xl font-bold mb-2">{foro.titulo}</h2>
            <div className="mb-4">
                <p><strong>Profesor:</strong> {foro.nombreProfesor}</p>
                <p><strong>Categoría:</strong> {foro.categoria}</p>
                <p><strong>Fecha:</strong> {foro.fecha}</p>
            </div>
            <button 
                onClick={onClose} 
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
                Cerrar
            </button>
        </div>
    );
}

