import React from 'react';

function SearchForm({ searchQuery, setSearchQuery, searchFilter, setSearchFilter }) {
  return (
    <div className="search-form">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar foros..."
      />
      <select
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      >
        <option value="titulo">Título</option>
        <option value="nombreProfesor">Profesor</option>
        <option value="categoria">Categoría</option>
      </select>
    </div>
  );
}

export default SearchForm;

