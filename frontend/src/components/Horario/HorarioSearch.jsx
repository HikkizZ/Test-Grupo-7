import { useState } from "react";

export default function HorarioSearch({ onSearch, onReset, loading }) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value, filter);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        onSearch(query, e.target.value);
    };

    return (
        <div>
            <h3>Buscar Horario</h3>
            <div>
                <label>
                    Selecciona un filtro:
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="">Buscar por ID y Curso</option>
                        <option value="id">Buscar por ID</option>
                        <option value="curso">Buscar por Curso</option>
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
                        ? "Ingresa el ID del horario"
                        : filter === "curso"
                        ? "Ingresa el Curso"
                        : "Buscar por ID y Curso"
                }
            />
            {query && (
                <button onClick={onReset} style={{ marginLeft: "10px" }}>
                    Ver Todos los Horarios
                </button>
            )}
            {loading && <p>Cargando horarios...</p>}
        </div>
    );
}
