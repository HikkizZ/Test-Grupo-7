import { useState } from "react";
import CursoViewPopup from "./CursoViewPopup";

export default function CursoRow({ curso, onEdit, onDelete, loadingUpdate, loadingDelete, fetchCursos }) {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState(null);

    const getButtonStyle = (baseStyle, isDisabled) => ({
        ...styles.button,
        ...baseStyle,
        ...(isDisabled ? styles.disabledButton : {}),
    });

    const handleViewClick = (curso) => {
        setSelectedCurso(curso);
        setShowPopup(true);

    };

    console.log('curso:', curso);
    return (
        <>
            <tr style={styles.tr}>
                <td style={styles.td}>{curso.code}</td>
                <td style={styles.td}>{curso.name}</td>
                <td style={styles.td}>{curso.level}</td>
                <td style={styles.td}>{curso.section}</td>
                <td style={styles.td}>{curso.year}</td>
                <td style={styles.td}>
                    <div style={styles.actionButtons}>
                        <button
                            style={getButtonStyle(styles.viewButton, false)}
                            onClick={() => handleViewClick(curso)}
                        >
                            Ver
                        </button>
                        <button
                            style={getButtonStyle(styles.editButton, loadingUpdate)}
                            onClick={() => onEdit(curso)}
                            disabled={loadingUpdate}
                        >
                            {loadingUpdate ? "Cargando..." : "Editar"}
                        </button>
                        <button
                            style={getButtonStyle(styles.deleteButton, loadingDelete)}
                            onClick={() => onDelete(curso)}
                            disabled={loadingDelete}
                        >
                            {loadingDelete ? "Cargando..." : "Eliminar"}
                        </button>
                    </div>
                </td>
            </tr>
            <CursoViewPopup
                active={showPopup}
                setActive={setShowPopup}
                data={selectedCurso}
                fetchCursos={fetchCursos}
            />
        </>
    );
}

const styles = {
    tr: {
        ':nth-child(even)': {
            backgroundColor: '#f8f9fa',
        },
        ':hover': {
            backgroundColor: '#e9ecef',
        },
    },
    td: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        verticalAlign: 'middle',
    },
    actionButtons: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    button: {
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s, opacity 0.3s',
    },
    viewButton: {
        backgroundColor: '#007bff',
        color: 'white',
        ':hover': {
            backgroundColor: '#0056b3',
        },
    },
    editButton: {
        backgroundColor: '#ffc107',
        color: '#212529',
        ':hover': {
            backgroundColor: '#e0a800',
        },
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        ':hover': {
            backgroundColor: '#c82333',
        },
    },
    disabledButton: {
        opacity: 0.6,
        cursor: 'not-allowed',
    },
};