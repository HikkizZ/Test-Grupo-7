import { useEffect, useState } from 'react';
import { getNews, deleteNews } from '@services/news.service';

export default function ListNews({ onEdit }) {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      try {
        await deleteNews(id);
        fetchNews();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{item.tituloNews}</h3>
              <p className="text-sm text-gray-600">
                Por {item.nombreAutor} | {new Date(item.fechaPublicacion).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-800"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          </div>
          <p className="mt-2">{item.contenido}</p>
        </div>
      ))}
    </div>
  );
}

