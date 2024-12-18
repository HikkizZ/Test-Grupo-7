import React, { useState, useEffect } from 'react';
import ListNews from '@components/News/ListNews';
import FormNews from '@components/News/FormNews';
import SearchNews from '@components/News/SearchNews'; // Cambiado de SearchForm a SearchNews
import { useNews } from '@hooks/news/useNews';
import { useSearchsNews } from '@hooks/news/useSearchNews';
import styles from '@styles/News.module.css';

export default function News() {
  // Estado para controlar si se está creando/editando una noticia
  const [isCreating, setIsCreating] = useState(false);
  // Estado para almacenar la noticia que se está editando
  const [editingNews, setEditingNews] = useState(null);
  
  // Utilizamos el hook personalizado useNews para manejar las operaciones de noticias
  const { news, loading, error, fetchNews } = useNews();
  
  // Utilizamos el hook personalizado useSearchsNews para manejar la búsqueda
  const { searchQuery, setSearchQuery, searchFilter, setSearchFilter, searchResults } = useSearchsNews(news);

  // Efecto para cargar las noticias cuando el componente se monta
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Manejador para cuando se completa la creación de una noticia
  const handleSubmit = () => {
    setIsCreating(false);
    setEditingNews(null);
    fetchNews(); // Actualizamos la lista de noticias después de crear/editar
  };

  // Manejador para iniciar la edición de una noticia
  const handleEdit = (news) => {
    setEditingNews(news);
    setIsCreating(true);
  };

  return (
    <div className={styles.newsContainer}>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1 className={styles.newsTitlePage}>Noticias</h1>
      {!isCreating && (
        <>
        <br/>
        <br/>
          {/* Componente de búsqueda */}
          <h3>Buscar Noticia</h3>
          <SearchNews
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          />
          <br/>
          <br/>
          {/* Botón para crear una nueva noticia */}
          <button onClick={() => setIsCreating(true)} className={styles.newNewsButton}>
            Nueva Noticia
          </button>
        </>
        
      )}
      {/* Renderi del formulario o la lista de noticias */}
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
        <ListNews 
          news={searchResults} 
          searchResults={searchResults}
          onEdit={handleEdit} 
          loading={loading} 
          error={error} 
        />
      )}
    </div>
  );
}