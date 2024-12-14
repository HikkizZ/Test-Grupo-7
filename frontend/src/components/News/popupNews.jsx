import { useState, useEffect } from 'react';
import { createNews, updateNews, getNewsById } from '@services/news.service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupNews({ show, setShow, id, onSubmit }) {
  const [formData, setFormData] = useState({
    tituloNews: '',
    nombreAutor: '',
    contenido: '',
    imagenPortada: null
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (show && id && id !== 'new') {
      fetchNews(id);
    } else if (show && id === 'new') {
      resetForm();
    }
  }, [show, id]);

  const resetForm = () => {
    setFormData({
      tituloNews: '',
      nombreAutor: '',
      contenido: '',
      imagenPortada: null
    });
    setPreviewImage(null);
  };
  const fetchNews = async (newsId) => {
    try {
      const data = await getNewsById(newsId);
      setFormData({
        tituloNews: data.tituloNews,
        nombreAutor: data.nombreAutor,
        contenido: data.contenido,
        imagenPortada: null
      });
      setPreviewImage(data.imagenPortada);
    } catch (error) {
      console.error('Error al obtener la noticia:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagenPortada' && files[0]) {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleQuillChange = (content) => {
    setFormData(prevState => ({ ...prevState, contenido: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newsData = new FormData();
      for (const key in formData) {
        if (key === 'imagenPortada') {
          if (formData[key] instanceof File) {
            newsData.append(key, formData[key]);
          }
        } else {
          newsData.append(key, formData[key]);
        }
      }

      let result;
      if (id && id !== 'new') {
        result = await updateNews(id, newsData);
      } else {
        result = await createNews(newsData);
      }
      onSubmit(result);
      setShow(false);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (!show) return null;

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={() => setShow(false)}>
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="popup-title">{id && id !== 'new' ? 'Editar Noticia' : 'Nueva Noticia'}</h2>
          
          <div className="form-group">
            <label htmlFor="tituloNews">Título de la noticia</label>
            <div className="input-container">
              <input
                type="text"
                id="tituloNews"
                name="tituloNews"
                value={formData.tituloNews}
                onChange={handleChange}
                required
                placeholder="Ingrese el título de la noticia"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nombreAutor">Autor</label>
            <div className="input-container">
              <input
                type="text"
                id="nombreAutor"
                name="nombreAutor"
                value={formData.nombreAutor}
                onChange={handleChange}
                required
                placeholder="Nombre del autor"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contenido">Contenido</label>
            <ReactQuill
              theme="snow"
              value={formData.contenido}
              onChange={handleQuillChange}
              modules={modules}
              placeholder="Escriba el contenido de la noticia aquí..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagenPortada">Imagen de Portada</label>
            <div className="input-container">
              <input
                type="file"
                id="imagenPortada"
                name="imagenPortada"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            {previewImage && (
              <div className="image-preview">
                <img 
                  src={previewImage} 
                  alt="Vista previa" 
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (id && id !== 'new' ? 'Actualizar Noticia' : 'Crear Noticia')}
          </button>
        </form>
      </div>
    </div>
  );
}

