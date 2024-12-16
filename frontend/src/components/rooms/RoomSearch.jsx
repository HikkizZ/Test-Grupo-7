import { useState } from "react";

export default function RoomSearch({ onSearch, onFilterUpdate, onReset, loading }) {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        name: "",
        size: "",
        roomType: "",
    });

    const [filterEnabled, setFilterEnabled] = useState({
        name: false,
        size: false,
        roomType: false,
    });

    // Mostrar botón de reset dinámicamente
    const [filtersActive, setFiltersActive] = useState(false);

    // Buscador General
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
        setFiltersActive(value.trim().length > 0 || Object.values(filterEnabled).includes(true));
    };

    // Checkbox Handling
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

    // Actualizar filtros individuales
    const handleFilterChange = (filter, value) => {
        setFilters((prev) => {
            const updated = { ...prev, [filter]: value };
            setFiltersActive(Object.values(updated).some((val) => val.trim().length > 0) || query.trim().length > 0);
            return updated;
        });
        onFilterUpdate(filter, value);
    };

    // Resetear filtros y buscador
    const resetFilters = () => {
        setFilters({ name: "", size: "", roomType: "" });
        setFilterEnabled({ name: false, size: false, roomType: false });
        setQuery("");
        setFiltersActive(false);
        onReset();
    };

    return (
        <div>
            {/* Buscador General */}
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Buscar por Nombre, Tamaño o Tipo de Sala"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            {/* Filtros específicos */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                }}
            >
                {/* Nombre */}
                <div>
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
                        style={{ marginLeft: "5px", width: "150px" }}
                    />
                </div>

                {/* Tamaño */}
                <div>
                    <input
                        type="checkbox"
                        checked={filterEnabled.size}
                        onChange={() => handleCheckboxChange("size")}
                    />
                    <label>Tamaño</label>
                    <input
                        type="number"
                        value={filters.size}
                        onChange={(e) => handleFilterChange("size", e.target.value)}
                        disabled={!filterEnabled.size}
                        placeholder="Tamaño (m²)"
                        style={{ marginLeft: "5px", width: "130px" }}
                    />
                </div>

                {/* Tipo */}
                <div>
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
                        style={{ marginLeft: "5px", width: "150px" }}
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
                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <button
                        onClick={resetFilters}
                        style={{
                            padding: "5px 10px",
                            borderRadius: "5px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Resetear Búsqueda
                    </button>
                </div>
            )}

            {loading && <p>Cargando salas...</p>}
        </div>
    );
}