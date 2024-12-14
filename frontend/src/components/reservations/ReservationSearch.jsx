import { useState } from "react";

export default function ReservationSearch({ onFilterUpdate, onReset, loading }) {
    const [areFiltersActive, setAreFiltersActive] = useState(false);

    const [filters, setFilters] = useState({
        id: "",
        devuelto: "",
        tipoReserva: "",
        estado: "",
        fechaDesde: { date: "", time: "" },
        fechaHasta: { date: "", time: "" },
    });

    const formatDateTime = (date, time) => {
        if (!date || !time) return "";
        const [yyyy, MM, dd] = date.split("-");
        return `${dd}-${MM}-${yyyy} ${time}`;
    };

    const handleFilterChange = (filter, value) => {
        let updatedFilters = { ...filters };

        if (filter === "fechaDesde.date" || filter === "fechaDesde.time") {
            const [field, subfield] = filter.split(".");
            updatedFilters[field][subfield] = value;
            updatedFilters.fechaDesdeFormatted = formatDateTime(
                updatedFilters.fechaDesde.date,
                updatedFilters.fechaDesde.time
            );
        } else if (filter === "fechaHasta.date" || filter === "fechaHasta.time") {
            const [field, subfield] = filter.split(".");
            updatedFilters[field][subfield] = value;
            updatedFilters.fechaHastaFormatted = formatDateTime(
                updatedFilters.fechaHasta.date,
                updatedFilters.fechaHasta.time
            );
        } else {
            updatedFilters[filter] = value;
        }

        setFilters(updatedFilters);

        const filterValue =
            filter.startsWith("fechaDesde") || filter.startsWith("fechaHasta")
                ? updatedFilters[filter.split(".")[0] + "Formatted"]
                : value;

        onFilterUpdate(filter.split(".")[0], filterValue);

        const hasActiveFilters = Object.values(updatedFilters).some((val) =>
            typeof val === "string" ? val !== "" : val.date || val.time
        );
        setAreFiltersActive(hasActiveFilters);
    };

    const handleResetFilters = () => {
        setFilters({
            id: "",
            devuelto: "",
            tipoReserva: "",
            estado: "",
            fechaDesde: { date: "", time: "" },
            fechaHasta: { date: "", time: "" },
        });
        setAreFiltersActive(false);
        onReset();
    };

    return (
        <div>
            <h3>Buscar Reservación</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={filters.id}
                    onChange={(e) => handleFilterChange("id", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <select
                    value={filters.devuelto}
                    onChange={(e) => handleFilterChange("devuelto", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="">Devuelto</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>

                <select
                    value={filters.tipoReserva}
                    onChange={(e) => handleFilterChange("tipoReserva", e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="">Tipo de Reserva</option>
                    <option value="sala">Sala</option>
                    <option value="recurso">Recurso</option>
                </select>

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

                <div>
                    <label>Fecha Desde</label>
                    <input
                        type="date"
                        value={filters.fechaDesde.date}
                        onChange={(e) => handleFilterChange("fechaDesde.date", e.target.value)}
                        style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    <input
                        type="time"
                        value={filters.fechaDesde.time}
                        onChange={(e) => handleFilterChange("fechaDesde.time", e.target.value)}
                        style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>

                <div>
                    <label>Fecha Hasta</label>
                    <input
                        type="date"
                        value={filters.fechaHasta.date}
                        onChange={(e) => handleFilterChange("fechaHasta.date", e.target.value)}
                        style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    <input
                        type="time"
                        value={filters.fechaHasta.time}
                        onChange={(e) => handleFilterChange("fechaHasta.time", e.target.value)}
                        style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>

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