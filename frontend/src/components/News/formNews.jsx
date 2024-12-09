import { useState } from 'react';
import { createNews, updateNews } from '@services/news.service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function FormNews({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    tituloNews: '',
    nombreAutor: '',
    contenido: '',
    fechaPublicacion: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await updateNews(formData, initialData.id);
      } else {
        await createNews(formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {initialData ? 'Editar Noticia' : 'Crear Nueva Noticia'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            value={formData.tituloNews}
            onChange={(e) => setFormData({ ...formData, tituloNews: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            minLength={3}
            maxLength={100}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Autor
          </label>
          <input
            type="text"
            value={formData.nombreAutor}
            onChange={(e) => setFormData({ ...formData, nombreAutor: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            minLength={3}
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contenido
          </label>
          <ReactQuill
            value={formData.contenido}
            onChange={(content) => setFormData({ ...formData, contenido: content })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
              ],
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image'
            ]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Publicación
          </label>
          <input
            type="date"
            value={formData.fechaPublicacion}
            onChange={(e) => setFormData({ ...formData, fechaPublicacion: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {initialData ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}