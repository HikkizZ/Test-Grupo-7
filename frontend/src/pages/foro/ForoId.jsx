import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getForo } from "@services/foro.service";
import styles from '@styles/foro.module.css';
import PDFViewer from '@components/Foro/PDFviewer';

export default function ForoDetail() {
  const [foro, setForo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchForo();
    }
  }, [id]);

  const fetchForo = async () => {
    try {
      setLoading(true);
      const data = await getForo(id);
      setForo(data);
    } catch (err) {
      setError('Error al cargar el foro. Por favor, intente de nuevo.');
      console.error('Error fetching foro:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.emptyMessage}>Cargando...</div>;
  if (error) return <div className={styles.emptyMessage}>{error}</div>;
  if (!foro) return <div className={styles.emptyMessage}>Foro no encontrado</div>;

  return (
    <div className={`${styles.forosContainer} ${styles.foroDetailContainer}`}>
      <Link to="/foros" className={`${styles.foroButton} ${styles.foroButtonView} ${styles.backButton}`}>
        &larr; Volver a la lista de foros
      </Link>
      
      <div className={`${styles.foroCard} ${styles.foroDetailCard}`}>
        <div className={styles.foroHeader}>
          <div className={styles.foroTitleContainer}>
            <h1 className={styles.foroTitle}>{foro.titulo}</h1>
            <span className={styles.foroProfessor}>Profesor: {foro.profesorNombre}</span>
          </div>
          <div className={styles.foroMeta}>
            <span className={styles.foroCategory}>{foro.categoria}</span>
            <span className={styles.foroDate}>Nivel: {foro.level}</span>
            <span className={styles.foroDate}>Sección: {foro.section}</span>
          </div>
        </div>
        
        <div className={`${styles.foroContent} ${styles.foroDetailContent}`}>
          <h3 className={styles.foroContentTitle}>Contenido:</h3>
          <p className={styles.foroSummary}>{foro.contenido}</p>
        </div>
        
        <div className={styles.foroMeta}>
          <span className={styles.foroDate}>Creado: {new Date(foro.fechaCreacion).toLocaleString()}</span>
          <span className={styles.foroDate}>Actualizado: {new Date(foro.fechaActualizacion).toLocaleString()}</span>
        </div>
        
        {foro.archivosAdjuntos && foro.archivosAdjuntos.length > 0 && (
          <div className={styles.foroAttachments}>
            <PDFViewer archivosAdjuntos={foro.archivosAdjuntos} foroId={foro.id} />
          </div>
        )}
      </div>
    </div>
  );
}