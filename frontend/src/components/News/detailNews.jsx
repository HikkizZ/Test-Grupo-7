import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById } from '@services/news.service';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(id);
        setNews(data);
      } catch (error) {
        console.error('Error:', error);
        navigate('/news');
      }
    };
    fetchNews();
  }, [id, navigate]);

  if (!news) return <div className="flex justify-center p-8">Cargando...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{news.tituloNews}</h1>
      <div className="flex items-center text-gray-600 mb-6">
        <span>Por {news.nombreAutor}</span>
        <span className="mx-2">•</span>
        <span>{new Date(news.fechaPublicacion).toLocaleDateString()}</span>
      </div>
      <div className="prose max-w-none">
        {news.contenido}
      </div>
      <button
        onClick={() => navigate('/news')}
        className="mt-8 text-blue-600 hover:text-blue-800"
      >
        ← Volver a noticias
      </button>
    </div>
  );
}
