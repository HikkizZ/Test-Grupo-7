import { useState } from "react";

export default function ReservationSearch({ onFilterUpdate, onReset, loading }) {
    const [areFiltersActive, setAreFiltersActive] = useState(false);

    // Estado para los filtros
    const [filters, setFilters] = useState({
        id: "",
        devuelto: "",
        tipoReserva: "",
        estado: "",
        fechaDesde: "",
        fechaHasta: "",
    });

    // Manejar cambios en los filtros
    const handleFilterChange = (filter, value) => {
        const updatedFilters = { ...filters, [filter]: value };
        setFilters(updatedFilters);
        onFilterUpdate(filter, value);

        // Detectar si hay algún filtro activo
        const hasActiveFilters = Object.values(updatedFilters).some((val) => val !== "");
        setAreFiltersActive(hasActiveFilters);
    };

    // Manejar el reset de filtros
    const handleResetFilters = () => {
        setFilters({
            id: "",
            devuelto: "",
            tipoReserva: "",
            estado: "",
            fechaDesde: "",
            fechaHasta: "",
        });
        setAreFiltersActive(false);
        onReset();
    };

    return (
        <div>
            <h3>Buscar Reservación</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {/* Filtro por ID */}
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={filters.id}
                    onChange={(e) => handleFilterChange("id", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                {/* Filtro por devuelto */}
                <select
                    value={filters.devuelto}
                    onChange={(e) => handleFilterChange("devuelto", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="">Devuelto</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>

                {/* Filtro por tipoReserva */}
                <select
                    value={filters.tipoReserva}
                    onChange={(e) => handleFilterChange("tipoReserva", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="">Tipo de Reserva</option>
                    <option value="sala">Sala</option>
                    <option value="recurso">Recurso</option>
                </select>

                {/* Filtro por estado */}
                <select
                    value={filters.estado}
                    onChange={(e) => handleFilterChange("estado", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="">Estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobada">Aprobada</option>
                    <option value="rechazada">Rechazada</option>
                </select>

                {/* Filtro por fechaDesde */}
                <input
                    type="text"
                    placeholder="Fecha Desde (DD-MM-YYYY HH:mm)"
                    value={filters.fechaDesde}
                    onChange={(e) => handleFilterChange("fechaDesde", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                {/* Filtro por fechaHasta */}
                <input
                    type="text"
                    placeholder="Fecha Hasta (DD-MM-YYYY HH:mm)"
                    value={filters.fechaHasta}
                    onChange={(e) => handleFilterChange("fechaHasta", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                {/* Botón para resetear filtros y ver todas las reservaciones */}
                {areFiltersActive && (
                    <button
                        onClick={handleResetFilters}
                        style={{
                            padding: "5px 10px",
                            borderRadius: "5px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Ver Todas las Reservaciones
                    </button>
                )}
            </div>
            {loading && <p>Cargando reservaciones...</p>}
        </div>
    );
}