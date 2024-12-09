import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/foro.module.css';

export default function ForoTable({ foros, onDelete, loadingDelete, onUpdate }) {
    const navigate = useNavigate();

    if (foros.length === 0) {
        return <p className="text-center text-gray-500">No se encontraron foros que coincidan con la búsqueda.</p>;
    }
    
    return (
        <div className={styles.forosContainer}>
            {foros.map((foro) => (
                <div key={foro.id} className={styles.foroCard}>
                    <div className={styles.foroHeader}>
                        <div className={styles.foroTitle}>
                            <h3>{foro.titulo}</h3>
                        </div>
                        <div className={styles.foroCategory}>
                            <span>{foro.categoria}</span>
                        </div>
                        <div className={styles.foroDate}>
                            <span>{foro.fecha}</span>
                        </div>
                    </div>
                    <div className={styles.foroContent}>
                        <div className={styles.foroProfessor}>
                            <span>{foro.nombreProfesor}</span>
                        </div>
                        <div className={styles.foroSummary}>
                            <p>{foro.contenido || 'Sin contenido'}</p>
                        </div>
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

