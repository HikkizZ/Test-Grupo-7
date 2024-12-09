import { useState } from "react";

export default function ReservationSearch({ onSearch, onReset, loading }) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");

    const handleSearch = () => {
        onSearch({ query, filter });
    };

    const handleReset = () => {
        setQuery("");
        setFilter("");
        onReset();
    };

    return (
        <div>
            <h3>Buscar Reservación</h3>
            <div style={{ display: "flex", gap: "10px" }}>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        height: "38px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "5px",
                        flex: "1",
                    }}
                >
                    <option value="">--Seleccionar filtro--</option>
                    <option value="id">Buscar por ID</option>
                    <option value="tipoReserva">Buscar por Tipo de Reserva</option>
                    <option value="estado">Buscar por Estado</option>
                </select>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                        filter === "id"
                            ? "Buscar por ID"
                            : filter === "tipoReserva"
                            ? "Buscar por Tipo de Reserva"
                            : "Buscar por Estado"
                    }
                    style={{
                        flex: "2",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        cursor: "pointer",
                    }}
                >
                    Buscar
                </button>
                <button
                    onClick={handleReset}
                    disabled={loading}
                    style={{
                        backgroundColor: "#d33",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        cursor: "pointer",
                    }}
                >
                    Resetear
                </button>
            </div>
            {loading && <p>Cargando resultados...</p>}
        </div>
    );
}
