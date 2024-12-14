import { useState } from 'react';
import ListNews from '../components/News/listNews';
import FormNews from '../components/News/formNews';
import styles from '../styles/News.module.css';

export default function News() {
  // Estado para controlar si se está creando/editando una noticia
  const [isCreating, setIsCreating] = useState(false);
  // Estado para almacenar la noticia que se está editando
  const [editingNews, setEditingNews] = useState(null);

  // Manejador para cuando se completa la creación/edición de una noticia
  const handleSubmit = () => {
    setIsCreating(false);
    setEditingNews(null);
  };

  // Manejador para iniciar la edición de una noticiaz
  const handleEdit = (news) => {
    setEditingNews(news);
    setIsCreating(true);
  };

  return (
    <div className={styles.newsContainer}>
      <h1 className={styles.newsTitle}>Noticias</h1>
      {/* Botón para crear una nueva noticia */}
      {!isCreating && (
        <button onClick={() => setIsCreating(true)} className={styles.newNewsButton}>
          Nueva Noticia
        </button>
      )}
      {/* Renderizado condicional del formulario o la lista de noticias */}
      {isCreating ? (
        <FormNews
          id={editingNews?.id}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsCreating(false);
            setEditingNews(null);
          }}
        />
      ) : (
        <ListNews onEdit={handleEdit} />
      )}
    </div>
  );
}

