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
                        <option value="">Buscar por Profesor y Curso</option>
                        <option value="teacherRut">Buscar RUT del Profesor</option>
                        <option value="teacherName">Buscar Nombre del Profesor</option>
                        <option value="cursoName">Buscar Nombre del Curso</option>
                        <option value="cursoCode">Buscar Código del Curso</option>
                    </select>
                </label>
            </div>
            <br />
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder={
                    filter === "teacherRut"
                        ? "Ingresa el RUT del profesor"
                        : filter === "teacherName"
                        ? "Ingresa el nombre del profesor"
                        : filter === "cursoName"
                        ? "Ingresa el nombre del curso"
                        : filter === "cursoCode"
                        ? "Ingresa el código del curso"
                        : "Buscar por Profesor y Curso"
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
