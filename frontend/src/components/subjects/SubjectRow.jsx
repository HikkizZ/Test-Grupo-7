
const styles = {
    tr: {
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
        subjectr: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s, opacity 0.3s',
    },
    viewButton: {
        backgroundColor: '#007bff',
        color: 'white',
        ':hover': {
            backgroundColor: '#0056b3',
        },
        cursor: 'pointer',
    },
    editButton: {
        backgroundColor: '#ffc107',
        color: '#212529',
        ':hover': {
            backgroundColor: '#e0a800',
        },
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        ':hover': {
            backgroundColor: '#c82333',
        },
        cursor: 'pointer',
    },
    disabledButton: {
        opacity: 0.6,
        subjectr: 'not-allowed',
    },
};

export default function SubjectRow({ subject, onEdit, onDelete, onView, loadingUpdate, loadingDelete, loadingView }) {

    const getButtonStyle = (baseStyle, isDisabled) => ({
        ...styles.button,
        ...baseStyle,
        ...(isDisabled ? styles.disabledButton : {}),
    });

    return (
        <tr style={styles.tr}>
            <td style={styles.td}>{subject.code}</td>
            <td style={styles.td}>{subject.name}</td>
            <td style={styles.td}>{subject.description || "Sin descripción"}</td>
            <td style={styles.td}>{subject.curso.code}</td>
            <td style={styles.td}>{subject.teacher.name}</td>
            <td style={styles.td}>
                <div style={styles.actionButtons}>
                    <button
                        style={getButtonStyle(styles.viewButton, false)}
                        onClick={() => onView(subject)}
                            disabled={loadingView}
                    >
                        Ver
                        {loadingView ? "Cargando..." : "Ver"}
                    </button>
                    <button
                        style={getButtonStyle(styles.editButton, loadingUpdate)}
                        onClick={() => onEdit(subject)}
                        disabled={loadingUpdate}
                    >
                        {loadingUpdate ? "Cargando..." : "Editar"}
                    </button>
                    <button
                        style={getButtonStyle(styles.deleteButton, loadingDelete)}
                        onClick={() => onDelete(subject)}
                        disabled={loadingDelete}
                    >
                        {loadingDelete ? "Cargando..." : "Eliminar"}
                    </button>
                </div>
            </td>
        </tr>
    );
}

