import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById, deleteNews, updateNews, ensureFullImageUrl } from '@services/news.service';
import Swal from 'sweetalert2';
import styles from '@styles/News.module.css';
import PopupNews from '@components/News/popupNews';

// Componente para mostrar los detalles de una noticia específica
export default function NewsId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    // Función para obtener los detalles de la noticia
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

  // Función para manejar la edición de la noticia
  const handleEdit = () => {
    setShowEditPopup(true);
  };

  // Función para manejar la actualización de la noticia
  const handleUpdate = async (updatedNews) => {
    try {
      setLoading(true);
      const result = await updateNews(id, updatedNews);
      if (result) {
        setNews(result);
        setShowEditPopup(false);
        Swal.fire('¡Actualizada!', 'La noticia ha sido actualizada con éxito', 'success');
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al actualizar la noticia:', error);
      Swal.fire('Error', 'No se pudo actualizar la noticia. Por favor, intente de nuevo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la eliminación de la noticia
  const handleDelete = async () => {
    // Mostrar confirmación antes de eliminar
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        // Eliminar la noticia
        await deleteNews(id);
        // Mostrar mensaje de éxito
        Swal.fire(
          '¡Eliminada!',
          'La noticia ha sido eliminada.',
          'success'
        );
        // Redirigir a la página de inicio
        navigate('/home');
      } catch (error) {
        console.error('Error al eliminar la noticia:', error);
        // Mostrar mensaje de error
        Swal.fire(
          'Error',
          'No se pudo eliminar la noticia. Por favor, intente de nuevo.',
          'error'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // Renderizado condicional basado en el estado de carga y error
  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!news) return <div className="flex justify-center items-center h-screen">Noticia no encontrada</div>;

  // Renderizado de los detalles de la noticia
  return (
    <div className={styles.newsDetailContainer}>
      <br/>
      <br/>
      <br/>
      <h1 className={styles.newsDetailTitle}>{news.tituloNews}</h1>
      <div className={styles.newsDetailMeta}>
        <span>Por {news.nombreAutor}</span>
        <span className={styles.newsDetailDate}>
          Publicado el {new Date(news.fechaPublicacion).toLocaleDateString()}
        </span>
      </div>
      {news.imagenPortada && (
        <img 
          src={ensureFullImageUrl(news.imagenPortada)} 
          alt={news.tituloNews} 
          className={styles.newsDetailImage}
        />
      )}
      <div 
        className={styles.newsDetailContent} 
        dangerouslySetInnerHTML={{ __html: news.contenido }} 
      />
      <div className={styles.newsActions}>
        <button 
          onClick={handleEdit}
          className={styles.editButton}
        >
          Editar
        </button>
        <button 
          onClick={handleDelete}
          className={styles.deleteButton}
        >
          Eliminar
        </button>
      </div>

      <PopupNews 
        show={showEditPopup}
        setShow={setShowEditPopup}
        id={id}
        onSubmit={handleUpdate}
      />
    </div>
  );
}

