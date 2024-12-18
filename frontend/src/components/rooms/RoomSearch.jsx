import { useState } from "react";
import "../../styles/around.css"; 

export default function RoomSearch({ onSearch, onFilterUpdate, onReset, loading }) {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        name: "",
        capacity: "",
        roomType: "",
    });

    const [filterEnabled, setFilterEnabled] = useState({
        name: false,
        capacity: false,
        roomType: false,
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
        setFilters({ name: "", capacity: "", roomType: "" });
        setFilterEnabled({ name: false, capacity: false, roomType: false });
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
                    placeholder="Buscar por Nombre, Capacidad o Tipo de Sala"
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

                {/* Capacidad */}
                <div className="filter-item">
                    <input
                        type="checkbox"
                        checked={filterEnabled.capacity}
                        onChange={() => handleCheckboxChange("capacity")}
                    />
                    <label>Capacidad</label>
                    <input
                        type="number"
                        value={filters.capacity}
                        onChange={(e) => handleFilterChange("capacity", e.target.value)}
                        disabled={!filterEnabled.capacity}
                        placeholder="Capacidad de Alumnos"
                        className="filter-input"
                    />
                </div>

                {/* Tipo */}
                <div className="filter-item">
                    <input
                        type="checkbox"
                        checked={filterEnabled.roomType}
                        onChange={() => handleCheckboxChange("roomType")}
                    />
                    <label>Tipo</label>
                    <select
                        value={filters.roomType}
                        onChange={(e) => handleFilterChange("roomType", e.target.value)}
                        disabled={!filterEnabled.roomType}
                        className="filter-select"
                    >
                        <option value="">Seleccionar</option>
                        <option value="laboratorio">Laboratorio</option>
                        <option value="computacion">Computación</option>
                        <option value="clases">Clases</option>
                    </select>
                </div>
            </div>

            {/* Reset Filters */}
            {filtersActive && (
                <div className="reset-container">
                    <button onClick={resetFilters} className="reset-button">
                        Resetear Búsqueda
                    </button>
                </div>
            )}

            {loading && <p className="loading-text">Cargando salas...</p>}
        </div>
    );
}