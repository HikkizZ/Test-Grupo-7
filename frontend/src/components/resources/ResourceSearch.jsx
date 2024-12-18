import { useState } from "react";
import "../../styles/around.css"; 

export default function ResourceSearch({ onSearch, onFilterUpdate, onReset, loading }) {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        name: "",
        brand: "",
        resourceType: "",
    });

    const [filterEnabled, setFilterEnabled] = useState({
        name: false,
        brand: false,
        resourceType: false,
    });

    const [filtersActive, setFiltersActive] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
        setFiltersActive(value.trim().length > 0 || Object.values(filterEnabled).includes(true));
    };

    const handleCheckboxChange = (filter) => {
        setFilterEnabled((prev) => {
            const updated = { ...prev, [filter]: !prev[filter] };
            setFiltersActive(Object.values(updated).includes(true) || query.trim().length > 0);
            return updated;
        });

        if (filterEnabled[filter]) {
            handleFilterChange(filter, "");
        }
    };

    const handleFilterChange = (filter, value) => {
        setFilters((prev) => {
            const updated = { ...prev, [filter]: value };
            setFiltersActive(Object.values(updated).some((val) => val.trim().length > 0) || query.trim().length > 0);
            return updated;
        });
        onFilterUpdate(filter, value);
    };

    const resetFilters = () => {
        setFilters({ name: "", brand: "", resourceType: "" });
        setFilterEnabled({ name: false, brand: false, resourceType: false });
        setQuery("");
        setFiltersActive(false);
        onReset();
    };

    return (
        <div className="search-container">
            {/* Buscador General */}
            <div className="general-search">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Buscar por Nombre, Marca o Tipo de Recurso"
                    className="search-input"
                />
            </div>

            {/* Filtros específicos */}
            <div className="filter-container">
                {/* Nombre */}
                <div className="filter-item">
                    <input
                        type="checkbox"
                        checked={filterEnabled.name}
                        onChange={() => handleCheckboxChange("name")}
                    />
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={filters.name}
                        onChange={(e) => handleFilterChange("name", e.target.value)}
                        disabled={!filterEnabled.name}
                        placeholder="Nombre"
                        className="filter-input"
                    />
                </div>

                {/* Marca */}
                <div className="filter-item">
                    <input
                        type="checkbox"
                        checked={filterEnabled.brand}
                        onChange={() => handleCheckboxChange("brand")}
                    />
                    <label>Marca</label>
                    <input
                        type="text"
                        value={filters.brand}
                        onChange={(e) => handleFilterChange("brand", e.target.value)}
                        disabled={!filterEnabled.brand}
                        placeholder="Marca"
                        className="filter-input"
                    />
                </div>

                {/* Tipo */}
                <div className="filter-item">
                    <input
                        type="checkbox"
                        checked={filterEnabled.resourceType}
                        onChange={() => handleCheckboxChange("resourceType")}
                    />
                    <label>Tipo</label>
                    <select
                        value={filters.resourceType}
                        onChange={(e) => handleFilterChange("resourceType", e.target.value)}
                        disabled={!filterEnabled.resourceType}
                        className="filter-select"
                    >
                        <option value="">Seleccionar</option>
                        <option value="Tecnologia">Tecnología</option>
                        <option value="Equipo de Sonido">Equipo de Sonido</option>
                        <option value="Material Didactico">Material Didáctico</option>
                    </select>
                </div>
            </div>

            {/* Resetear Búsqueda */}
            {filtersActive && (
                <div className="reset-container">
                    <button onClick={resetFilters} className="reset-button">
                        Resetear Búsqueda
                    </button>
                </div>
            )}

            {loading && <p className="loading-text">Cargando recursos...</p>}
        </div>
    );
}