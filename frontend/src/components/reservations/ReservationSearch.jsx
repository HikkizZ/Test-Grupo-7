import { useState } from "react";

export default function ReservationSearch({ onFilterUpdate, onReset, loading }) {
    const [areFiltersActive, setAreFiltersActive] = useState(false);

    const [filters, setFilters] = useState({
        devuelto: "",
        tipoReserva: "",
        estado: "",
        fechaDesde: "",
        horaDesde: "",
        fechaHasta: "",
        horaHasta: "",
    });

    const [filterEnabled, setFilterEnabled] = useState({
        devuelto: false,
        tipoReserva: false,
        estado: false,
        fechaDesde: false,
        fechaHasta: false,
    });

    const formatDateTime = (date, time) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        if (!time) return `${day}-${month}-${year}`;
        const [hour, minute] = time.split(":");
        return `${day}-${month}-${year} ${hour}:${minute}`;
    };

    const handleCheckboxChange = (filter) => {
        setFilterEnabled((prev) => ({
            ...prev,
            [filter]: !prev[filter],
        }));

        // Limpiar valores cuando se desactiva el filtro
        if (!filterEnabled[filter]) {
            handleFilterChange(filter, "");
            if (filter === "fechaDesde") handleFilterChange("horaDesde", "");
            if (filter === "fechaHasta") handleFilterChange("horaHasta", "");
        }
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

        const hasActiveFilters = Object.values(filterEnabled).some((enabled) => enabled);
        setAreFiltersActive(hasActiveFilters);
    };

    const handleResetFilters = () => {
        setFilters({
            devuelto: "",
            tipoReserva: "",
            estado: "",
            fechaDesde: "",
            horaDesde: "",
            fechaHasta: "",
            horaHasta: "",
        });

        setFilterEnabled({
            devuelto: false,
            tipoReserva: false,
            estado: false,
            fechaDesde: false,
            fechaHasta: false,
        });

        setAreFiltersActive(false);
        onReset();
    };

    return (
        <div>
            <h3>Buscar Reservación</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {/* Devuelto */}
                <div>
                    <input
                        type="checkbox"
                        checked={filterEnabled.devuelto}
                        onChange={() => handleCheckboxChange("devuelto")}
                    />
                    <label style={{ marginLeft: "5px" }}>Devuelto</label>
                    <select
                        value={filters.devuelto}
                        onChange={(e) => handleFilterChange("devuelto", e.target.value)}
                        disabled={!filterEnabled.devuelto}
                        style={{
                            backgroundColor: filterEnabled.devuelto ? "#fff" : "#e0e0e0",
                        }}
                    >
                        <option value="">Seleccione</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                </div>

                {/* Tipo de Reserva */}
                <div>
                    <input
                        type="checkbox"
                        checked={filterEnabled.tipoReserva}
                        onChange={() => handleCheckboxChange("tipoReserva")}
                    />
                    <label style={{ marginLeft: "5px" }}>Tipo de Reserva</label>
                    <select
                        value={filters.tipoReserva}
                        onChange={(e) => handleFilterChange("tipoReserva", e.target.value)}
                        disabled={!filterEnabled.tipoReserva}
                        style={{
                            backgroundColor: filterEnabled.tipoReserva ? "#fff" : "#e0e0e0",
                        }}
                    >
                        <option value="">Seleccione</option>
                        <option value="sala">Sala</option>
                        <option value="recurso">Recurso</option>
                    </select>
                </div>

                {/* Estado */}
                <div>
                    <input
                        type="checkbox"
                        checked={filterEnabled.estado}
                        onChange={() => handleCheckboxChange("estado")}
                    />
                    <label style={{ marginLeft: "5px" }}>Estado</label>
                    <select
                        value={filters.estado}
                        onChange={(e) => handleFilterChange("estado", e.target.value)}
                        disabled={!filterEnabled.estado}
                        style={{
                            backgroundColor: filterEnabled.estado ? "#fff" : "#e0e0e0",
                        }}
                    >
                        <option value="">Seleccione</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                    </select>
                </div>

                {/* Fecha Desde */}
                <div>
                    <input
                        type="checkbox"
                        checked={filterEnabled.fechaDesde}
                        onChange={() => handleCheckboxChange("fechaDesde")}
                    />
                    <label style={{ marginLeft: "5px" }}>Fecha Desde</label>
                    <div style={{ display: "flex", gap: "5px" }}>
                        <input
                            type="date"
                            value={filters.fechaDesde}
                            onChange={(e) => handleFilterChange("fechaDesde", e.target.value)}
                            disabled={!filterEnabled.fechaDesde}
                            style={{
                                backgroundColor: filterEnabled.fechaDesde ? "#fff" : "#e0e0e0",
                            }}
                        />
                        <input
                            type="time"
                            value={filters.horaDesde}
                            onChange={(e) => handleFilterChange("horaDesde", e.target.value)}
                            disabled={!filterEnabled.fechaDesde}
                            style={{
                                backgroundColor: filterEnabled.fechaDesde ? "#fff" : "#e0e0e0",
                            }}
                        />
                    </div>
                </div>

                {/* Fecha Hasta */}
                <div>
                    <input
                        type="checkbox"
                        checked={filterEnabled.fechaHasta}
                        onChange={() => handleCheckboxChange("fechaHasta")}
                    />
                    <label style={{ marginLeft: "5px" }}>Fecha Hasta</label>
                    <div style={{ display: "flex", gap: "5px" }}>
                        <input
                            type="date"
                            value={filters.fechaHasta}
                            onChange={(e) => handleFilterChange("fechaHasta", e.target.value)}
                            disabled={!filterEnabled.fechaHasta}
                            style={{
                                backgroundColor: filterEnabled.fechaHasta ? "#fff" : "#e0e0e0",
                            }}
                        />
                        <input
                            type="time"
                            value={filters.horaHasta}
                            onChange={(e) => handleFilterChange("horaHasta", e.target.value)}
                            disabled={!filterEnabled.fechaHasta}
                            style={{
                                backgroundColor: filterEnabled.fechaHasta ? "#fff" : "#e0e0e0",
                            }}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleResetFilters}
                style={{
                    marginTop: "10px",
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

            {loading && <p>Cargando reservaciones...</p>}
        </div>
    );
}