import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@styles/foro.module.css';

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
                            <span className={styles.foroProfessor}>{foro.profesor?.nombre || 'Profesor no asignado'}</span>
                        </div>
                        <div className={styles.foroMeta}>
                            <span className={styles.foroCategory}>{foro.categoria}</span>
                            <span className={styles.foroLevel}>Nivel: {foro.level}</span>
                            <span className={styles.foroSection}>Sección: {foro.section}</span>
                            <span className={styles.foroDate}>{new Date(foro.fechaCreacion).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className={styles.foroContent}>
                        <p className={styles.foroSummary}>
                            {foro.contenido && foro.contenido.trim() !== '' 
                                ? foro.contenido.substring(0, 150) + '...'
                                : 'Sin contenido'}
                        </p>
                        {foro.archivosAdjuntos && foro.archivosAdjuntos.length > 0 && (
                            <div className={styles.foroAttachments}>
                                <p className={styles.attachmentTitle}>Archivos adjuntos: {foro.archivosAdjuntos.length}</p>
                            </div>
                        )}
                    </div>
                    <div className={styles.foroActions}>
                        <button 
                            onClick={() => navigate(`/foro/${foro.id}`)} 
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

