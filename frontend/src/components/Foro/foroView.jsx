import React from 'react';
import { downloadFile } from '@services/foro.service';
import styles from '@styles/foro.module.css';

const ForoView = ({ foro, onClose }) => {
  const handleDownload = async () => {
    try {
      if (foro.archivosAdjuntos && foro.archivosAdjuntos.length > 0) {
        await downloadFile(foro.id);
      } else {
        alert('Este foro no tiene archivos adjuntos para descargar.');
      }
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      alert('Error al descargar el archivo. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className={styles.foroViewContainer}>
      <div className={styles.foroViewContent}>
        <h2 className={styles.foroViewTitle}>{foro.titulo}</h2>
        <div className={styles.foroViewMeta}>
          <p>Profesor: {foro.profesorNombre || 'No asignado'}</p>
          <p>RUT del Profesor: {foro.profesorRut || 'No disponible'}</p>
          <p>Categoría: {foro.categoria}</p>
          <p>Nivel: {foro.level}</p>
          <p>Sección: {foro.section}</p>
          <p>Fecha de creación: {new Date(foro.fechaCreacion).toLocaleString()}</p>
          <p>Última actualización: {new Date(foro.fechaActualizacion).toLocaleString()}</p>
        </div>
        <div className={styles.foroViewBody}>
          <h3>Contenido:</h3>
          <p>{foro.contenido || 'Sin contenido'}</p>
        </div>
        {foro.archivosAdjuntos && foro.archivosAdjuntos.length > 0 && (
          <div className={styles.foroViewAttachments}>
            <h3>Archivos adjuntos:</h3>
            <button onClick={handleDownload} className={styles.downloadButton}>
              Descargar archivo adjunto
            </button>
          </div>
        )}
      </div>
      <button onClick={onClose} className={styles.closeButton}>Cerrar</button>
    </div>
  );
};

export default ForoView;