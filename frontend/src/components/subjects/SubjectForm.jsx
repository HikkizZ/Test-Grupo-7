import { useState } from 'react';
import { showErrorAlert } from '../../helpers/sweetAlert';

export default function SubjectForm({ onCreate, loading }) {
    const [showForm, setShowForm] = useState(false);

    const [subjectData, setsubjectData] = useState({
        name: '',
        description: '',
        cursoCode: '',
        rutProfesor: '',
    });

    const handleCancel = () => {
        setsubjectData({
            name: '',
            description: '',
            cursoCode: '',
            rutProfesor: '',
        });
        setShowForm(false);
    };

    const handleSubmit = () => {
        const { name, cursoCode, rutProfesor } = subjectData;
        if (!name || !cursoCode || !rutProfesor) {
            showErrorAlert('Todos los campos son requeridos');
            console.log(subjectData)
            return;
        }
        
        onCreate(subjectData)
            .catch((error) => {
                showErrorAlert('Ocurrió un error al crear la asignatura', error.response?.data?.datails);
            });
        handleCancel();
    }; 

    return (
        <div style={styles.container}>
            {!showForm ? (
                <button 
                    onClick={() => setShowForm(true)} 
                    style={{...styles.button, ...styles.createButton}}
                >
                    Crear Asignatura
                </button>
            ) : (
                <div style={styles.form}>
                    <input
                        type='text'
                        placeholder='Nombre'
                        value={subjectData.name}
                        onChange={(e) => setsubjectData({ ...subjectData, name: e.target.value })}
                        disabled={loading}
                        style={styles.input}
                    />
                    <input
                        type='text'
                        placeholder='Descripción'
                        value={subjectData.description}
                        onChange={(e) => setsubjectData({ ...subjectData, description: e.target.value })}
                        disabled={loading}
                        style={styles.input}
                    />
                    <input
                        type='text'
                        placeholder='Código del curso'
                        value={subjectData.cursoCode}
                        onChange={(e) => setsubjectData({ ...subjectData, cursoCode: e.target.value })}
                        disabled={loading}
                        style={styles.input}
                    />
                    <input
                        type='text'
                        placeholder='RUT del profesor'
                        value={subjectData.rutProfesor}
                        onChange={(e) => setsubjectData({ ...subjectData, rutProfesor: e.target.value })}
                        disabled={loading}
                        style={styles.input}
                    />
                    <div style={styles.buttonGroup}>
                        <button 
                            onClick={handleCancel} 
                            disabled={loading}
                            style={{...styles.button, ...styles.cancelButton}}
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            disabled={loading}
                            style={{...styles.button, ...styles.createButton}}
                        >
                            Crear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '500px',
        margin: '10px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '90%',
    },
    select: {
        padding: '12px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '100%',
        backgroundColor: 'white',
    },
    button: {
        padding: '12px 15px',
        fontSize: '14px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    createButton: {
        backgroundColor: '#007bff',
        color: 'white',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        color: 'white',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginTop: '15px',
    },
};