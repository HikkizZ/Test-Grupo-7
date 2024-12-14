import { useState, useEffect } from 'react';
import { createNews, updateNews, getNewsById } from '@services/news.service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function FormNews({ id, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    tituloNews: '',
    nombreAutor: '',
    contenido: '',
    imagenPortada: null
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (id) {
      fetchNews(id);
    }
  }, [id]);

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
      if (id) {
        result = await updateNews(id, newsData);
      } else {
        result = await createNews(newsData);
      }
      onSubmit(result);
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

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">{id ? 'Editar Noticia' : 'Crear Nueva Noticia'}</h2>
      <div>
        <label htmlFor="tituloNews" className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          id="tituloNews"
          name="tituloNews"
          value={formData.tituloNews}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="nombreAutor" className="block text-sm font-medium text-gray-700">Autor</label>
        <input
          type="text"
          id="nombreAutor"
          name="nombreAutor"
          value={formData.nombreAutor}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="contenido" className="block text-sm font-medium text-gray-700">Contenido</label>
        <ReactQuill
          theme="snow"
          value={formData.contenido}
          onChange={handleQuillChange}
          modules={modules}
          formats={formats}
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="imagenPortada" className="block text-sm font-medium text-gray-700">Imagen de Portada</label>
        <input
          type="file"
          id="imagenPortada"
          name="imagenPortada"
          onChange={handleChange}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
        {previewImage && (
          <img 
            src={previewImage} 
            alt="Vista previa" 
            className="mt-4 max-w-xs rounded-lg shadow-md" 
          />
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

