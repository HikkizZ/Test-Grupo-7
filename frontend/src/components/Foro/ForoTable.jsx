import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/foro.module.css';

export default function ForoTable({ foros, onDelete, loadingDelete, onUpdate }) {
    const navigate = useNavigate();

    if (foros.length === 0) {
        return <p className={styles.emptyMessage}>No se encontraron foros que coincidan con la búsqueda.</p>;
    }
    
    return (
        <div className={styles.forosContainer}>
            {foros.map((foro) => (
                <div key={foro.id} className={styles.foroCard}>
                    <div className={styles.foroHeader}>
                        <div className={styles.foroTitleContainer}>
                            <h3 className={styles.foroTitle}>{foro.titulo}</h3>
                            <span className={styles.foroProfessor}>{foro.nombreProfesor}</span>
                        </div>
                        <div className={styles.foroMeta}>
                            <span className={styles.foroCategory}>{foro.categoria}</span>
                            <span className={styles.foroDate}>{foro.fecha}</span>
                        </div>
                    </div>
                    <div className={styles.foroContent}>
                        <p className={styles.foroSummary}>
                            {foro.contenido && foro.contenido.trim() !== '' 
                                ? foro.contenido 
                                : 'Sin contenido'}
                        </p>
                        {foro.archivosAdjuntos && foro.archivosAdjuntos.length > 0 && (
                            <div className={styles.foroAttachments}>
                                <p className={styles.attachmentTitle}>Archivos adjuntos:</p>
                                <ul className={styles.attachmentList}>
                                    {foro.archivosAdjuntos.map((archivo, index) => (
                                        <li key={index} className={styles.attachmentItem}>
                                            <a 
                                                href={archivo.archivoPath}
                                                download={archivo.nombre}
                                                className={styles.attachmentLink}
                                            >
                                                {archivo.nombre}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className={styles.foroActions}>
                        <button 
                            onClick={() => navigate(`/post/${foro.id}`)} 
                            className={`${styles.foroButton} ${styles.foroButtonView}`}
                        >
                            Ver
                        </button>
                        <button 
                            onClick={() => onUpdate(foro)} 
                            className={`${styles.foroButton} ${styles.foroButtonUpdate}`}
                        >
                            Actualizar
                        </button>
                        <button 
                            onClick={() => onDelete(foro.id)} 
                            disabled={loadingDelete}
                            className={`${styles.foroButton} ${styles.foroButtonDelete}`}
                        >
                            {loadingDelete ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

