import { useState } from "react";
import CursoRow from "./CursoRow";
import PopupCursos from "./PopupCursos";

export default function CursoTable({ cursos, onDelete, onUpdate, fetchCursos }) {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState(null);

    const handleEditClick = (curso) => {
        setSelectedCurso(curso);
        setShowPopup(true);
    };

    const handleUpdate = (updatedCursoData) => {
        onUpdate(selectedCurso.id, updatedCursoData);
        setShowPopup(false);
    };

    return (
        <div style={styles.container}>
                <h2 style={styles.title}>Lista de Cursos</h2>
            <div style={styles.tableResponsive}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Código</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Nivel</th>
                            <th style={styles.th}>Sección</th>
                            <th style={styles.th}>Año</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cursos.map((curso) => (
                            <CursoRow
                                key={curso.id}
                                curso={curso}
                                onEdit={handleEditClick}
                                onDelete={onDelete}
                                loadingUpdate={false}
                                loadingDelete={false}
                                fetchCursos={fetchCursos}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <PopupCursos
                    show={showPopup}
                    setShow={setShowPopup}
                    data={selectedCurso}
                    action={handleUpdate}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px',
        textAlign: 'center',
    },
    tableResponsive: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    th: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f8f9fa',
        color: '#333',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '14px',
    },
    td: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
};