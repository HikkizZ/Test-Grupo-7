import React, { useState, useEffect } from 'react';
import { createForo, updateForo } from '@services/foro.service';
import styles from '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupForo({ isOpen, onClose, foro, onSubmit }) {
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    contenido: '',
    level: '',
    section: '',
    archivos: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && foro) {
      setFormData({
        titulo: foro.titulo || '',
        categoria: foro.categoria || '',
        contenido: foro.contenido || '',
        level: foro.level || '',
        section: foro.section || '',
        archivos: []
      });
    } else if (isOpen) {
      resetForm();
    }
  }, [isOpen, foro]);

  const resetForm = () => {
    setFormData({
      titulo: '',
      categoria: '',
      contenido: '',
      level: '',
      section: '',
      archivos: []
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'archivos' && files) {
      setFormData(prevState => ({
        ...prevState,
        [name]: Array.from(files)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const foroData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'archivos') {
          formData[key].forEach(file => {
            foroData.append('archivos', file);
          });
        } else {
          foroData.append(key, formData[key]);
        }
      });

      let result;
      if (foro && foro.id) {
        result = await updateForo(foro.id, foroData);
      } else {
        result = await createForo(foroData);
      }
      onSubmit(result);
      onClose();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.bg}>
      <div className={styles.popup}>
        <button className={styles.close} onClick={onClose}>
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>{foro && foro.id ? 'Editar Foro' : 'Nuevo Foro'}</h2>
          
          <div className={styles.container_inputs}>
            <label htmlFor="titulo">Título del foro</label>
            <div className={styles.input_container}>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                placeholder="Ingrese el título del foro"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.container_inputs}>
            <label htmlFor="categoria">Categoría</label>
            <div className={styles.input_container}>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">--Seleccionar--</option>
                <option value="Tarea">Tarea</option>
                <option value="Contenido">Contenido</option>
                <option value="Variedad">Variedad</option>
              </select>
            </div>
          </div>

          <div className={styles.container_inputs}>
            <label htmlFor="contenido">Contenido</label>
            <div className={styles.input_container}>
              <textarea
                id="contenido"
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                required
                placeholder="Escriba el contenido del foro aquí..."
                className={styles.textarea}
              />
            </div>
          </div>

          <div className={styles.container_inputs}>
            <label htmlFor="level">Nivel</label>
            <div className={styles.input_container}>
              <input
                type="number"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                min="1"
                max="4"
                placeholder="Ingrese el nivel (1-4)"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.container_inputs}>
            <label htmlFor="section">Sección</label>
            <div className={styles.input_container}>
              <input
                type="text"
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                maxLength="1"
                pattern="[A-Z]"
                placeholder="Ingrese la sección (A-Z)"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.container_inputs}>
            <label htmlFor="archivos">Archivos adjuntos</label>
            <div className={styles.input_container}>
              <input
                type="file"
                id="archivos"
                name="archivos"
                onChange={handleChange}
                multiple
                className={styles.file_input}
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submit_button}
            disabled={loading}
          >
            {loading ? 'Guardando...' : (foro && foro.id ? 'Actualizar Foro' : 'Crear Foro')}
          </button>
        </form>
      </div>
    </div>
  );
}