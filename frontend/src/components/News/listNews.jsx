import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ensureFullImageUrl } from '@services/news.service';
import styles from '@styles/News.module.css';

export default function ListNews({ searchResults, onEdit, loading, error }) {
  const navigate = useNavigate();

  // Función para manejar el clic en una noticia
  const handleNewsClick = (id) => {
    navigate(`/home/news/${id}`);
  };

  // Renderizado condicional basado en el estado de carga y error
  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (searchResults.length === 0) return <div className="text-center py-4">No hay noticias disponibles.</div>;

  return (
    <div className={styles.newsGrid}>
      {searchResults.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion))
      .map((item) => (
        <article key={item.id} className={styles.newsCard} onClick={() => handleNewsClick(item.id)}>
          <div className={styles.newsImage}>
            {item.imagenPortada ? (
              <img 
                src={ensureFullImageUrl(item.imagenPortada)}
                alt={item.tituloNews}
                className={styles.newsImage}
                onError={(e) => {
                  console.error('Error al cargar la imagen:', e.target.src);
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
                }}
              />
            ) : (
              <div className={styles.newsImage}>
                <span>Imagen No Disponible</span>
              </div>
            )}
          </div>
          <div className={styles.newsContent}>
            <h2 className={styles.newsTitle}>{item.tituloNews}</h2>
            <p className={styles.newsAuthor}>Por {item.nombreAutor}</p>
            <p className={styles.newsDate}>
              Publicado el {new Date(item.fechaPublicacion).toLocaleDateString()}
            </p>
            <div className={styles.newsExcerpt} dangerouslySetInnerHTML={{ __html: item.contenido.substring(0, 150) + '...' }} />          
          </div>
        </article>
      ))}
    </div>
  );
}

