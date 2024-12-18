import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '@styles/foro.module.css';

function UpdateForoForm({ foro, onUpdate, onCancel, loading }) {
    // Estados para cada campo del formulario
    const [titulo, setTitulo] = useState(foro.titulo);
    const [contenido, setContenido] = useState(foro.contenido);
    const [categoria, setCategoria] = useState(foro.categoria);
    const [archivo, setArchivo] = useState(null);
    const [level, setLevel] = useState(foro.level);
    const [section, setSection] = useState(foro.section);

    // Efecto para actualizar los estados cuando cambia el foro
    useEffect(() => {
        setTitulo(foro.titulo);
        setContenido(foro.contenido);
        setCategoria(foro.categoria);
        setLevel(foro.level);
        setSection(foro.section);
    }, [foro]);

    // Handler para cambios en el archivo
    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    // Handler para el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('contenido', contenido);
        formData.append('categoria', categoria);
        formData.append('level', level);
        formData.append('section', section);
        if (archivo) {
            formData.append('archivos', archivo);
        }

        onUpdate(foro.id, formData);
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

            {/* Campo de archivo adjunto */}
            <div className={styles.formGroup}>
                <label htmlFor="archivo" className={styles.formLabel}>Archivo adjunto:</label>
                <input
                    id="archivo"
                    type="file"
                    onChange={handleFileChange}
                    className={styles.formFileInput}
                />
            </div>

            {/* Botones de acción */}
            <div className={styles.formActions}>
                <button 
                    type="submit"
                    disabled={loading}
                    className={`${styles.foroButton} ${styles.foroButtonSubmit}`}
                >
                    {loading ? 'Actualizando...' : 'Actualizar'}
                </button>
                <button 
                    type="button" 
                    onClick={onCancel}
                    className={`${styles.foroButton} ${styles.foroButtonCancel}`}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default UpdateForoForm;