import { useState } from "react";

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

    const [filtersActive, setFiltersActive] = useState(false); // Mostrar botón de reset dinámicamente

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
        setFilters({ name: "", brand: "", resourceType: "" });
        setFilterEnabled({ name: false, brand: false, resourceType: false });
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
                    placeholder="Buscar por Nombre, Marca o Tipo de Recurso"
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

                {/* Marca */}
                <div>
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
                        style={{ marginLeft: "5px", width: "150px" }}
                    />
                </div>

                {/* Tipo de Recurso */}
                <div>
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
                        style={{ marginLeft: "5px", width: "150px" }}
                    >
                        <option value="">Seleccionar</option>
                        <option value="Tecnologia">Tecnología</option>
                        <option value="Equipo de Sonido">Equipo de Sonido</option>
                        <option value="Material Didactico">Material Didáctico</option>
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

            {loading && <p>Cargando recursos...</p>}
        </div>
    );
}