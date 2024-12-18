import { showErrorAlert } from "../../helpers/sweetAlert";

export default function NotasRow({ notas, onCalificar, loadingUpdate }){

    const getButtonStyle = (baseStyle, isDisabled) => ({
        ...styles.button,
        ...baseStyle,
        ...(isDisabled ? styles.disabledButton : {}),
    });

    const handleEdit = () => {
        const calificacionData = {
            rutUser: notas.student.rut,
            nota: parseFloat(prompt("Ingrese la nota")),
            idCalificacion: notas.calificacion.id,
        };

        if (calificacionData.nota && !isNaN(calificacionData.nota)) {
            onCalificar(calificacionData);
        } else {
            showErrorAlert("Error", "Ingrese una nota válida");
        }
    };

    return (
        <> 
            <tr style={styles.tr}>
                <td style={styles.td}>{notas.student.rut}</td>
                <td style={styles.td}>{notas.student.name}</td>
                <td style={styles.td}>{notas.subject.name}</td>
                <td style={styles.td}>{notas.subject.code}</td>
                <td style={styles.td}>{notas.calificacion.name}</td>
                <td style={styles.td}>{notas.nota}</td>
                <td style={styles.td}>
                    <div style={styles.actionButtons}>
                        <button
                            style={getButtonStyle(styles.editButton, loadingUpdate)}
                            onClick={handleEdit}
                            disabled={loadingUpdate}
                        >
                            {loadingUpdate ? "Cargando..." : "Calificar"}
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}

const styles = {
    tr: {
        ':nth-child(even)': {
            backgroundColor: '#f8f9fa',
        },
        ':hover': {
            backgroundColor: '#e9ecef',
        },
        textAlign: 'center',
    },
    td: {
        padding: '12px',
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
        verticalAlign: 'middle',
    },
    actionButtons: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
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
    editButton: {
        backgroundColor: '#ffc107',
        color: '#212529',
        ':hover': {
            backgroundColor: '#e0a800',
        },
    },
    disabledButton: {
        opacity: 0.6,
        cursor: 'not-allowed',
    },
};