import React from 'react';
import { downloadFile } from '@services/foro.service';
import styles from '@styles/foro.module.css';

const ForoView = ({ foro, onClose }) => {
  const handleDownload = async (fileName) => {
    try {
      await downloadFile(foro.id, fileName);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div className={styles.foroViewContainer}>
      <div className={styles.foroViewContent}>
        <h2 className={styles.foroViewTitle}>{foro.titulo}</h2>
        <div className={styles.foroViewMeta}>
          <p>Profesor: {foro.profesor?.nombre || 'No asignado'}</p>
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
            <ul>
              {foro.archivosAdjuntos.map((archivo, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleDownload(archivo.nombre)}
                    className={styles.downloadButton}
                  >
                    {archivo.nombre}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={onClose} className={styles.closeButton}>Cerrar</button>
    </div>
  );
};

export default ForoView;