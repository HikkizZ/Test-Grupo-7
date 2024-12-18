import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '@styles/foro.module.css';

function ForoForm({ onCreate, loading, onCancel }) {
    // Estados para cada campo del formulario
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [contenido, setContenido] = useState('');
    const [level, setLevel] = useState('');
    const [section, setSection] = useState('');
    const [archivos, setArchivos] = useState([]);

    // Hnadle para cambios en los archivos adjuntos
    const handleFileChange = (event) => {
        setArchivos(Array.from(event.target.files));
    };

    // handler para el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('categoria', categoria);
        formData.append('contenido', contenido);
        formData.append('level', level);
        formData.append('section', section);

        // Agregar cada archivo al FormData
        archivos.forEach((archivo) => {
            formData.append('archivos', archivo);
        });

        // Llamar a la función onCreate pasada como prop
        onCreate(formData);
        
        // Reiniciar los campos del formulario
        setTitulo('');
        setCategoria('');
        setContenido('');
        setLevel('');
        setSection('');
        setArchivos([]);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.foroForm}>
            {/* Campo de título */}
            <div className={styles.formGroup}>
                <label htmlFor="titulo" className={styles.formLabel}>Título:</label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    className={styles.formInput}
                    style={{ maxWidth: '400px' }}
                />
            </div>

            {/* Campo de categoría */}
            <div className={styles.formGroup}>
                <label htmlFor="categoria" className={styles.formLabel}>Categoría:</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    className={styles.formSelect}
                    style={{ maxWidth: '200px' }}
                >
                    <option value="">--Seleccionar--</option>
                    <option value="Tarea">Tarea</option>
                    <option value="Contenido">Contenido</option>
                    <option value="Variedad">Variedad</option>
                </select>
            </div>

            {/* Campo de contenido usando ReactQuill */}
            <div className={styles.formGroup}>
                <label htmlFor="contenido" className={styles.formLabel}>Contenido:</label>
                <ReactQuill
                    theme="snow"
                    value={contenido}
                    onChange={setContenido}
                    className={styles.formQuill}
                    style={{ height: '200px', marginBottom: '50px' }}
                />
            </div>

            {/* Campo de nivel */}
            <div className={styles.formGroup}>
                <label htmlFor="level" className={styles.formLabel}>Nivel:</label>
                <input
                    id="level"
                    type="number"
                    min="1"
                    max="4"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                    className={styles.formInput}
                    style={{ maxWidth: '100px' }}
                />
            </div>

            {/* Campo de sección */}
            <div className={styles.formGroup}>
                <label htmlFor="section" className={styles.formLabel}>Sección:</label>
                <input
                    id="section"
                    type="text"
                    maxLength="1"
                    pattern="[A-Z]"
                    value={section}
                    onChange={(e) => setSection(e.target.value.toUpperCase())}
                    required
                    className={styles.formInput}
                    style={{ maxWidth: '100px' }}
                />
            </div>

            {/* Campo de archivos adjuntos */}
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

            {/* Botones de acción */}
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