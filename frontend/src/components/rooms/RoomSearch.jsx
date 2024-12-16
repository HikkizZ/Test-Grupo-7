import { useState } from "react";

export default function RoomSearch({ onSearch, onFilterUpdate, onReset, loading }) {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        id: "",
        name: "",
        size: "",
        roomType: "",
    });

    const [filterEnabled, setFilterEnabled] = useState({
        id: false,
        name: false,
        size: false,
        roomType: false,
    });

    // Buscador General
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    // Checkbox Handling
    const handleCheckboxChange = (filter) => {
        setFilterEnabled((prev) => ({
            ...prev,
            [filter]: !prev[filter],
        }));

        if (filterEnabled[filter]) {
            handleFilterChange(filter, "");
        }
    };

    // Actualizar filtros individuales
    const handleFilterChange = (filter, value) => {
        setFilters((prev) => ({
            ...prev,
            [filter]: value,
        }));
        onFilterUpdate(filter, value);
    };

    // Resetear filtros
    const resetFilters = () => {
        setFilters({ id: "", name: "", size: "", roomType: "" });
        setFilterEnabled({ id: false, name: false, size: false, roomType: false });
        setQuery("");
        onReset(); // Llama a la función para restablecer desde el padre
    };

    // Comprobar si hay filtros activos
    const filtersActive = Object.values(filterEnabled).some((enabled) => enabled);

    return (
        <div>
            {/* Buscador General */}
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Buscar por ID, Nombre, Tamaño o Tipo"
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
                {/* ID */}
                <div>
                    <input
                        type="checkbox"
                        checked={filterEnabled.id}
                        onChange={() => handleCheckboxChange("id")}
                    />
                    <label>ID</label>
                    <input
                        type="text"
                        value={filters.id}
                        onChange={(e) => handleFilterChange("id", e.target.value)}
                        disabled={!filterEnabled.id}
                        placeholder="ID"
                        style={{ marginLeft: "5px", width: "120px" }}
                    />
                </div>

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
                        Resetear Filtros
                    </button>
                </div>
            )}

            {loading && <p>Cargando salas...</p>}
        </div>
    );
}