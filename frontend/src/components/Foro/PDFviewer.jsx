import React from 'react';
import { getPDFContent } from '@services/foro.service';

const PDFViewer = ({ archivosAdjuntos, foroId }) => {
  const handleViewPDF = async (fileName) => {
    try {
      const pdfUrl = await getPDFContent(foroId, fileName);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error al abrir el PDF:', error);
      alert('Error al abrir el PDF. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Archivos adjuntos:</h3>
      {archivosAdjuntos.map((archivo) => (
        <button
          key={archivo.id}
          className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => handleViewPDF(archivo.nombre)}
        >
          {archivo.nombre}
        </button>
      ))}
    </div>
  );
};

export default PDFViewer;