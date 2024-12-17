import React, { useState, useEffect } from 'react';
import { createForo, updateForo } from '@services/foro.service';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupForo({ show, setShow, foro, onSubmit }) {
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
    if (show && foro) {
      setFormData({
        titulo: foro.titulo || '',
        categoria: foro.categoria || '',
        contenido: foro.contenido || '',
        level: foro.level || '',
        section: foro.section || '',
        archivos: []
      });
    } else if (show) {
      resetForm();
    }
  }, [show, foro]);

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
      setShow(false);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={() => setShow(false)}>
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <form onSubmit={handleSubmit} className="form">
          <h2 className="title">{foro && foro.id ? 'Editar Foro' : 'Nuevo Foro'}</h2>
          
          <div className="container_inputs">
            <label htmlFor="titulo">Título del foro</label>
            <div className="input-container">
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                placeholder="Ingrese el título del foro"
              />
            </div>
          </div>

          <div className="container_inputs">
            <label htmlFor="categoria">Categoría</label>
            <div className="input-container">
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="">--Seleccionar--</option>
                <option value="Tarea">Tarea</option>
                <option value="Contenido">Contenido</option>
                <option value="Variedad">Variedad</option>
              </select>
            </div>
          </div>

          <div className="container_inputs">
            <label htmlFor="contenido">Contenido</label>
            <div className="input-container">
              <textarea
                id="contenido"
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                required
                placeholder="Escriba el contenido del foro aquí..."
              />
            </div>
          </div>

          <div className="container_inputs">
            <label htmlFor="level">Nivel</label>
            <div className="input-container">
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
              />
            </div>
          </div>

          <div className="container_inputs">
            <label htmlFor="section">Sección</label>
            <div className="input-container">
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
              />
            </div>
          </div>

          <div className="container_inputs">
            <label htmlFor="archivos">Archivos adjuntos</label>
            <div className="input-container">
              <input
                type="file"
                id="archivos"
                name="archivos"
                onChange={handleChange}
                multiple
              />
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (foro && foro.id ? 'Actualizar Foro' : 'Crear Foro')}
          </button>
        </form>
      </div>
    </div>
  );
}

