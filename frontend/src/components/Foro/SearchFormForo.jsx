import React from 'react';
import styles from '@styles/foro.module.css';

function SearchForm({ searchQuery, setSearchQuery, searchFilter, setSearchFilter }) {
  return (
    <div className={styles.searchForm}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar foros..."
        className={styles.searchInput}
      />
      <select
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        className={styles.searchSelect}
      >
        <option value="titulo">Título</option>
        <option value="nombreProfesor">Profesor</option>
        <option value="categoria">Categoría</option>
      </select>
    </div>
  );
}

export default SearchForm;