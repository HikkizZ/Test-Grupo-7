import React, { useState } from 'react';
import { getPDFContent, downloadFile } from '@services/foro.service';
import styles from '@styles/foro.module.css';

const PDFViewer = ({ foroId }) => {
  const [selectedPDF, setSelectedPDF] = useState(null);

  const handleViewPDF = async () => {
    try {
      const pdfUrl = await getPDFContent(foroId);
      setSelectedPDF(pdfUrl);
    } catch (error) {
      console.error('Error al cargar el PDF:', error);
      alert('Error al cargar el PDF. Por favor, inténtelo de nuevo.');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      await downloadFile(foroId);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      alert('Error al descargar el PDF. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className={styles.pdfViewerContainer}>
      <h3>Archivo PDF adjunto:</h3>
      <div className={styles.pdfActions}>
        <button onClick={handleViewPDF} className={styles.viewButton}>
          Ver PDF
        </button>
        <button onClick={handleDownloadPDF} className={styles.downloadButton}>
          Descargar PDF
        </button>
      </div>
      {selectedPDF && (
        <div className={styles.pdfContainer}>
          <iframe src={selectedPDF} width="100%" height="500px" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
