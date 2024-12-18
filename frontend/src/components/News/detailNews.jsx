// Importaciones necesarias
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById, ensureFullImageUrl } from '@services/news.service';

// Componente para mostrar el detalle de una noticia
export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para cargar los datos de la noticia
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(id);
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudo cargar la noticia. Por favor, intente de nuevo más tarde.');
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  // Renderizado condicional basado en el estado de carga y error
  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!news) return <div className="flex justify-center items-center h-screen">Noticia no encontrada</div>;

  // Renderizado del detalle de la noticia
  return (
    <div className="max-w-4xlmx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{news.tituloNews}</h1>
      <div className="flex items-center text-gray-600 mb-6">
        <span>Por {news.autor ? news.autor.name : 'Autor desconocido'}</span>
        <span className="mx-2">•</span>
        <span>{new Date(news.fechaPublicacion).toLocaleDateString()}</span>
      </div>
      {news.imagenPortada && (
        <img 
          src={ensureFullImageUrl(news.imagenPortada)} 
          alt={news.tituloNews} 
          className="w-full h-64 object-cover mb-6 rounded-lg"
        />
      )}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: news.contenido }} />
      <button
        onClick={() => navigate('/news')}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        ← Volver a noticias
      </button>
    </div>
  );
}