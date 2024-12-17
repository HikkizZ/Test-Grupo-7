import { useState } from 'react';
import { showErrorAlert } from '../../helpers/sweetAlert';

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
        width: '95%',
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

export default function CursoForm({ onCreate, loading }) {
    const [showForm, setShowForm] = useState(false);

    const [cursoData, setCursoData] = useState({
        name: '',
        level: '',
        section: '',
        year: ''
    });

    const handleCancel = () => {
        setCursoData({
            name: '',
            level: '',
            section: '',
            year: ''
        });
        setShowForm(false);
    };

    const handleSubmit = () => {
        const { name, level, section, year } = cursoData;
        if (!name || !level || !section || !year) {
            showErrorAlert('Todos los campos son requeridos');
            return;
        }

        if (!/^[a-zA-Z]$/.test(section)) {
            showErrorAlert('La sección debe ser un caracter alfabético');
            return;
        }
        
        onCreate(cursoData);
        handleCancel();
    }; 

    return (
        <div style={styles.container}>
            {!showForm ? (
                <button 
                    onClick={() => setShowForm(true)} 
                    style={{...styles.button, ...styles.createButton}}
                >
                    Crear Curso
                </button>
            ) : (
                <div style={styles.form}>
                    <input
                        type='text'
                        placeholder='Nombre'
                        value={cursoData.name}
                        onChange={(e) => setCursoData({ ...cursoData, name: e.target.value })}
                        disabled={loading}
                        style={styles.input}
                    />
                    <select
                        value={cursoData.level}
                        onChange={(e) => setCursoData({ ...cursoData, level: e.target.value })}
                        disabled={loading}
                        style={styles.select}
                    >
                        <option value=''>Nivel</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                    <input
                        type='text'
                        placeholder='Sección'
                        value={cursoData.section}
                        onChange={(e) => setCursoData({ ...cursoData, section: e.target.value })}
                        disabled={loading}
                        style={styles.input}
                    />
                    <input
                        type='text'
                        placeholder='Año'
                        value={cursoData.year = new Date().getFullYear()}
                        onChange={(e) => setCursoData({ ...cursoData, year: e.target.value })}
                        readOnly
                        disabled={loading}
                        style={{...styles.input, backgroundColor: '#e9ecef', cursor: 'not-allowed'}}
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
