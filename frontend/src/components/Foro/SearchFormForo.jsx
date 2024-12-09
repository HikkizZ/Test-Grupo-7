import React from 'react';

function SearchForm({ searchQuery, setSearchQuery, searchFilter, setSearchFilter }) {
  return (
    <div className="search-form flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar foros..."
        className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        className="px-4 py-2 border-t border-b border-r rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="titulo">Título</option>
        <option value="nombreProfesor">Profesor</option>
        <option value="categoria">Categoría</option>
      </select>
    </div>
  );
}

export default SearchForm;

