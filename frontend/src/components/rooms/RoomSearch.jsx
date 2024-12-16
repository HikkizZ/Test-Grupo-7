import { useState } from "react";

export default function RoomSearch({ onSearch, onReset, loading }) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value, filter); // Llamar al callback con query y filtro
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        onSearch(query, e.target.value); // Llamar al callback con query y nuevo filtro
    };

    return (
        <div>
            <h3>Buscar Sala</h3>
            <div>
                <label>
                    Selecciona un filtro:
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="">Buscar por ID, Nombre, Tamaño o Tipo</option>
                        <option value="id">Buscar por ID</option>
                        <option value="name">Buscar por Nombre</option>
                        <option value="size">Buscar por Tamaño</option>
                        <option value="roomType">Buscar por Tipo</option>
                    </select>
                </label>
            </div>
            <br />
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder={
                    filter === "id"
                        ? "Buscar por ID"
                        : filter === "name"
                        ? "Buscar por Nombre"
                        : filter === "size"
                        ? "Buscar por Tamaño (m²)"
                        : filter === "roomType"
                        ? "Buscar por Tipo (laboratorio, computacion, clases)"
                        : "Buscar por ID, Nombre, Tamaño o Tipo"
                }
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            {query && (
                <button onClick={onReset} style={{ marginLeft: "10px" }}>
                    Ver Todas las Salas
                </button>
            )}
            {loading && <p>Cargando salas...</p>}
        </div>
    );
}