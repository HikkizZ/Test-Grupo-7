import { useState } from "react";

export default function ReservationSearch({ onFilterUpdate, onReset, loading }) {
    const [areFiltersActive, setAreFiltersActive] = useState(false);

    const [filters, setFilters] = useState({
        id: "",
        devuelto: "",
        tipoReserva: "",
        estado: "",
        fechaDesde: "",
        horaDesde: "00:00",
        fechaHasta: "",
        horaHasta: "00:00",
    });

    const formatDateTime = (date, time) => {
        if (!date || !time) return "";
        const [year, month, day] = date.split("-");
        const [hour, minute] = time.split(":");
        return `${day}-${month}-${year} ${hour}:${minute}`; // Formato DD-MM-YYYY HH:mm
    };

    const handleFilterChange = (filter, value) => {
        const updatedFilters = { ...filters, [filter]: value };
        setFilters(updatedFilters);

        if (filter === "fechaDesde" || filter === "horaDesde") {
            const fechaHoraDesde = formatDateTime(
                updatedFilters.fechaDesde,
                updatedFilters.horaDesde
            );
            onFilterUpdate("fechaDesde", fechaHoraDesde.trim());
        } else if (filter === "fechaHasta" || filter === "horaHasta") {
            const fechaHoraHasta = formatDateTime(
                updatedFilters.fechaHasta,
                updatedFilters.horaHasta
            );
            onFilterUpdate("fechaHasta", fechaHoraHasta.trim());
        } else {
            onFilterUpdate(filter, value);
        }

        const hasActiveFilters = Object.values(updatedFilters).some((val) => val !== "");
        setAreFiltersActive(hasActiveFilters);
    };

    const handleResetFilters = () => {
        setFilters({
            id: "",
            devuelto: "",
            tipoReserva: "",
            estado: "",
            fechaDesde: "",
            horaDesde: "00:00",
            fechaHasta: "",
            horaHasta: "00:00",
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

                {/* Fecha Desde */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label>Fecha Desde</label>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <input
                            type="date"
                            value={filters.fechaDesde}
                            onChange={(e) => handleFilterChange("fechaDesde", e.target.value)}
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <input
                            type="time"
                            value={filters.horaDesde}
                            onChange={(e) => handleFilterChange("horaDesde", e.target.value)}
                            step="60" // Incremento de un minuto
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                </div>

                {/* Fecha Hasta */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label>Fecha Hasta</label>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <input
                            type="date"
                            value={filters.fechaHasta}
                            onChange={(e) => handleFilterChange("fechaHasta", e.target.value)}
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <input
                            type="time"
                            value={filters.horaHasta}
                            onChange={(e) => handleFilterChange("horaHasta", e.target.value)}
                            step="60" // Incremento de un minuto
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
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