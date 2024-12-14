import React, { useState } from 'react';
import styles from '@styles/foro.module.css';

function ForoForm({ onCreate, loading, onCancel }) {
    const [titulo, setTitulo] = useState('');
    const [nombreProfesor, setNombreProfesor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [archivos, setArchivos] = useState([]);

    const handleFechaChange = (event) => {
        const selectedDate = event.target.value;
        setFecha(selectedDate);
    };

    const handleFileChange = (event) => {
        setArchivos(Array.from(event.target.files));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const [year, month, day] = fecha.split("-");
        const formattedDate = `${day}/${month}/${year}`;

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('nombreProfesor', nombreProfesor);
        formData.append('categoria', categoria);
        formData.append('fecha', formattedDate);

        archivos.forEach((archivo, index) => {
            formData.append(`archivos`, archivo);
        });

        onCreate(formData);
        
        setTitulo('');
        setNombreProfesor('');
        setCategoria('');
        setFecha('');
        setArchivos([]);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.foroForm}>
            <div className={styles.formGroup}>
                <label htmlFor="titulo" className={styles.formLabel}>Título:</label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="nombreProfesor" className={styles.formLabel}>Nombre del Profesor:</label>
                <input
                    id="nombreProfesor"
                    type="text"
                    value={nombreProfesor}
                    onChange={(e) => setNombreProfesor(e.target.value)}
                    required
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="categoria" className={styles.formLabel}>Categoría:</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    className={styles.formSelect}
                >
                    <option value="">--Seleccionar--</option>
                    <option value="Tarea">Tarea</option>
                    <option value="Contenido">Contenido</option>
                    <option value="Variedad">Variedad</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="fecha" className={styles.formLabel}>Fecha:</label>
                <input
                    id="fecha"
                    type="date"
                    value={fecha}
                    onChange={handleFechaChange}
                    required
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="archivos" className={styles.formLabel}>Archivos adjuntos:</label>
                <input
                    id="archivos"
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className={styles.formFileInput}
                />
            </div>
            <div className={styles.formActions}>
                <button 
                    type="button" 
                    onClick={onCancel}
                    className={`${styles.foroButton} ${styles.foroButtonCancel}`}
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`${styles.foroButton} ${styles.foroButtonSubmit}`}
                >
                    {loading ? 'Creando...' : 'Crear Foro'}
                </button>
            </div>
        </form>
    );
}

export default ForoForm;