import { useState } from "react";

export default function ReservationSearch({ onFilterUpdate, onReset, loading }) {
    const [areFiltersActive, setAreFiltersActive] = useState(false);

    const [filters, setFilters] = useState({
        id: "",
        devuelto: "",
        tipoReserva: "",
        estado: "",
        fechaDesde: { date: "", hour: "00", minute: "00" },
        fechaHasta: { date: "", hour: "00", minute: "00" },
    });

    const formatDateTimeForBackend = ({ date, hour, minute }) => {
        if (!date || hour === "" || minute === "") return "";
        const [yyyy, MM, dd] = date.split("-");
        return `${dd}-${MM}-${yyyy} ${hour}:${minute}`;
    };

    const handleFilterChange = (filter, value) => {
        const [field, subfield] = filter.split(".");
        const updatedFilters = { ...filters };

        if (subfield) {
            updatedFilters[field][subfield] = value;
        } else {
            updatedFilters[filter] = value;
        }

        // Formatear fecha y hora para el backend
        if (field === "fechaDesde" || field === "fechaHasta") {
            updatedFilters[field].formatted = formatDateTimeForBackend(updatedFilters[field]);
            onFilterUpdate(field, updatedFilters[field].formatted);
        } else {
            onFilterUpdate(filter, value);
        }

        setFilters(updatedFilters);

        const hasActiveFilters = Object.values(updatedFilters).some(
            (val) =>
                typeof val === "string" ? val !== "" : val.date || val.hour !== "00" || val.minute !== "00"
        );
        setAreFiltersActive(hasActiveFilters);
    };

    const handleResetFilters = () => {
        setFilters({
            id: "",
            devuelto: "",
            tipoReserva: "",
            estado: "",
            fechaDesde: { date: "", hour: "00", minute: "00" },
            fechaHasta: { date: "", hour: "00", minute: "00" },
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

                {/* Campo de Fecha Desde */}
                <div>
                    <label>Fecha Desde</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            type="date"
                            value={filters.fechaDesde.date}
                            onChange={(e) => handleFilterChange("fechaDesde.date", e.target.value)}
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <select
                            value={filters.fechaDesde.hour}
                            onChange={(e) => handleFilterChange("fechaDesde.hour", e.target.value)}
                            style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                        >
                            {Array.from({ length: 24 }).map((_, i) => (
                                <option key={i} value={i.toString().padStart(2, "0")}>
                                    {i.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                        :
                        <select
                            value={filters.fechaDesde.minute}
                            onChange={(e) => handleFilterChange("fechaDesde.minute", e.target.value)}
                            style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                        >
                            {Array.from({ length: 60 }).map((_, i) => (
                                <option key={i} value={i.toString().padStart(2, "0")}>
                                    {i.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Campo de Fecha Hasta */}
                <div>
                    <label>Fecha Hasta</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                            type="date"
                            value={filters.fechaHasta.date}
                            onChange={(e) => handleFilterChange("fechaHasta.date", e.target.value)}
                            style={{
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <select
                            value={filters.fechaHasta.hour}
                            onChange={(e) => handleFilterChange("fechaHasta.hour", e.target.value)}
                            style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                        >
                            {Array.from({ length: 24 }).map((_, i) => (
                                <option key={i} value={i.toString().padStart(2, "0")}>
                                    {i.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                        :
                        <select
                            value={filters.fechaHasta.minute}
                            onChange={(e) => handleFilterChange("fechaHasta.minute", e.target.value)}
                            style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                        >
                            {Array.from({ length: 60 }).map((_, i) => (
                                <option key={i} value={i.toString().padStart(2, "0")}>
                                    {i.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
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