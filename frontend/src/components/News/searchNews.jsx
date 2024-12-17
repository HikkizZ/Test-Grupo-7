import React from 'react';
import styles from '@styles/News.module.css'; // Asumiendo que tienes un archivo de estilos

function SearchNews({ searchQuery, setSearchQuery }) {
  return (
    <div className={`${styles.searchContainer} flex items-center mb-4`}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Palabras Clave"
        className={`${styles.searchInput} px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
}

export default SearchNews;

