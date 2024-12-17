import { useState, useEffect, useRef } from 'react';
import { getNewsById } from '@services/news.service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupNews({ show, setShow, id, onSubmit }) {
  // Referencia para el editor de texto enriquecido
  const quillRef = useRef(null);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    tituloNews: '',
    nombreAutor: '',
    contenido: '',
    imagenPortada: null
  });

  // Estado para controlar si se está cargando algo
  const [loading, setLoading] = useState(false);

  // Efecto que se ejecuta cuando cambia el estado de 'show' o 'id'
  useEffect(() => {
    if (show && id && id !== 'new') {
      // Si se está mostrando el popup y hay un id válido, obtener los datos de la noticia
      fetchNews(id);
    } else if (show && id === 'new') {
      // Si se está creando una nueva noticia, reiniciar el formulario
      resetForm();
    }
  }, [show, id]);

  // Función para reiniciar el formulario
  const resetForm = () => {
    setFormData({
      tituloNews: '',
      nombreAutor: '',
      contenido: '',
      imagenPortada: null
    });
  };

  // Función para obtener los datos de una noticia existente
  const fetchNews = async (newsId) => {
    try {
      const data = await getNewsById(newsId);
      setFormData({
        tituloNews: data.tituloNews,
        nombreAutor: data.nombreAutor,
        contenido: data.contenido,
        imagenPortada: null
      });
    } catch (error) {
      console.error('Error al obtener la noticia:', error);
    }
  };

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagenPortada' && files[0]) {
      // Si se selecciona una imagen, actualizar el estado
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      // Para otros campos, simplemente actualizar el estado
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Manejador de cambios en el editor de texto enriquecido
  const handleQuillChange = (content) => {
    setFormData(prevState => ({ ...prevState, contenido: content }));
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Crear un objeto FormData para enviar los datos, incluyendo la imagen
      const newsData = new FormData();
      newsData.append('tituloNews', formData.tituloNews);
      newsData.append('nombreAutor', formData.nombreAutor);
      newsData.append('contenido', formData.contenido);
      
      // Solo agregar la imagen si se ha seleccionado una nueva
      if (formData.imagenPortada instanceof File) {
        newsData.append('imagenPortada', formData.imagenPortada);
      }

      // Llamar a la función onSubmit pasada como prop
      await onSubmit(newsData);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  // Configuración de la barra de herramientas del editor de texto enriquecido
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  // Si no se debe mostrar el popup, no renderizar nada
  if (!show) return null;

  // Renderizado del componente
  return (
    <div className="bg">
      <div className="popup">
        {/* Botón para cerrar el popup */}
        <button className="close" onClick={() => setShow(false)}>
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <form onSubmit={handleSubmit} className="form">
          {/* Título del formulario */}
          <h2 className="title">{id && id !== 'new' ? 'Editar Noticia' : 'Nueva Noticia'}</h2>
          
          {/* Campo para el título de la noticia */}
          <div className="container_inputs">
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

          {/* Campo para el nombre del autor */}
          <div className="container_inputs">
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

          {/* Editor de texto enriquecido para el contenido */}
          <div className="container_inputs">
            <label htmlFor="contenido">Contenido</label>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={formData.contenido}
              onChange={handleQuillChange}
              modules={modules}
              placeholder="Escriba el contenido de la noticia aquí..."
            />
          </div>

          {/* Campo para subir la imagen de portada */}
          <div className="container_inputs">
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
          </div>

          {/* Botón para enviar el formulario */}
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

