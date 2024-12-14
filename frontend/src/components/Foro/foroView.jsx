import React from 'react';
import { downloadFile } from '@services/foro.service';

const Foro = ({ foro }) => {
  const fecha = new Date(foro.fecha).toLocaleDateString();

  const handleDownload = async (fileName) => {
    try {
      await downloadFile(foro.id, fileName);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{foro.titulo}</h2>
      <div className="text-gray-700 mb-2">
        <p>Profesor: {foro.nombreProfesor}</p>
        <p>Categoría: {foro.categoria}</p>
        <p>Fecha: {fecha}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Contenido:</h3>
        <p>{foro.contenido || 'Sin contenido'}</p>
      </div>
      {foro.archivosAdjuntos && foro.archivosAdjuntos.length > 0 && (
        <div>
          <h3 className="font-bold">Archivos adjuntos:</h3>
          <ul>
            {foro.archivosAdjuntos.map((archivo, index) => (
              <li key={index}>
                <button 
                  onClick={() => handleDownload(archivo.nombre)}
                  className="text-blue-500 hover:underline"
                >
                  {archivo.nombre}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Foro;

