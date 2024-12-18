import { useState } from "react";

export default function ReservationSearch({ onFilterUpdate, onReset, loading }) {
    const [filters, setFilters] = useState({
        devuelto: "",
        tipoReserva: "",
        estado: "",
        fechaDesde: "",
        horaDesde: "",
        fechaHasta: "",
        horaHasta: "",
        reservante: "",
    });

    const [filterEnabled, setFilterEnabled] = useState({
        devuelto: false,
        tipoReserva: false,
        estado: false,
        fechaDesde: false,
        fechaHasta: false,
        reservante: false,
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
            reservante: "",
        });

        setFilterEnabled({
            devuelto: false,
            tipoReserva: false,
            estado: false,
            fechaDesde: false,
            fechaHasta: false,
            reservante: false,
        });

        onReset();
    };

    const filtersActive = Object.values(filterEnabled).some((enabled) => enabled);

    return (
        <div>

            {/* Primera Fila */}
            <div style={filterRowStyle}>
                <TextFilter
                    label="Reservante"
                    filterName="reservante"
                    filterValue={filters.reservante}
                    enabled={filterEnabled.reservante}
                    onCheckboxChange={() => handleCheckboxChange("reservante")}
                    onFilterChange={handleFilterChange}
                />

                <FilterSection
                    label="Tipo de Reserva"
                    filterName="tipoReserva"
                    filterValue={filters.tipoReserva}
                    enabled={filterEnabled.tipoReserva}
                    onCheckboxChange={() => handleCheckboxChange("tipoReserva")}
                    onFilterChange={handleFilterChange}
                    options={[
                        { value: "", label: "Seleccione" },
                        { value: "sala", label: "Sala" },
                        { value: "recurso", label: "Recurso" },
                    ]}
                />

                <FilterSection
                    label="Estado"
                    filterName="estado"
                    filterValue={filters.estado}
                    enabled={filterEnabled.estado}
                    onCheckboxChange={() => handleCheckboxChange("estado")}
                    onFilterChange={handleFilterChange}
                    options={[
                        { value: "", label: "Seleccione" },
                        { value: "pendiente", label: "Pendiente" },
                        { value: "aprobada", label: "Aprobada" },
                        { value: "rechazada", label: "Rechazada" },
                    ]}
                />
            </div>

            {/* Segunda Fila */}
            <div style={filterRowStyle}>
                <DateTimeFilter
                    label="Fecha Desde"
                    dateValue={filters.fechaDesde}
                    timeValue={filters.horaDesde}
                    enabled={filterEnabled.fechaDesde}
                    onCheckboxChange={() => handleCheckboxChange("fechaDesde")}
                    onDateChange={(e) => handleFilterChange("fechaDesde", e.target.value)}
                    onTimeChange={(e) => handleFilterChange("horaDesde", e.target.value)}
                    onClearTime={() => handleFilterChange("horaDesde", "")}
                />

                <DateTimeFilter
                    label="Fecha Hasta"
                    dateValue={filters.fechaHasta}
                    timeValue={filters.horaHasta}
                    enabled={filterEnabled.fechaHasta}
                    onCheckboxChange={() => handleCheckboxChange("fechaHasta")}
                    onDateChange={(e) => handleFilterChange("fechaHasta", e.target.value)}
                    onTimeChange={(e) => handleFilterChange("horaHasta", e.target.value)}
                    onClearTime={() => handleFilterChange("horaHasta", "")}
                />

                <FilterSection
                    label="Devuelto"
                    filterName="devuelto"
                    filterValue={filters.devuelto}
                    enabled={filterEnabled.devuelto}
                    onCheckboxChange={() => handleCheckboxChange("devuelto")}
                    onFilterChange={handleFilterChange}
                    options={[
                        { value: "", label: "Seleccione" },
                        { value: "true", label: "Sí" },
                        { value: "false", label: "No" },
                    ]}
                />
            </div>

            {/* Botón Resetear */}
            {filtersActive && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button onClick={handleResetFilters} style={resetButtonStyle}>
                        Resetear Filtros
                    </button>
                </div>
            )}

            {loading && <p>Cargando reservaciones...</p>}
        </div>
    );
}

function FilterSection({ label, filterName, filterValue, enabled, onCheckboxChange, onFilterChange, options }) {
    return (
        <div>
            <input type="checkbox" checked={enabled} onChange={onCheckboxChange} />
            <label style={{ marginLeft: "5px" }}>{label}</label>
            <select
                value={filterValue}
                onChange={(e) => onFilterChange(filterName, e.target.value)}
                disabled={!enabled}
                style={selectStyle(enabled)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function DateTimeFilter({ label, dateValue, timeValue, enabled, onCheckboxChange, onDateChange, onTimeChange, onClearTime }) {
    return (
        <div>
            <input type="checkbox" checked={enabled} onChange={onCheckboxChange} />
            <label style={{ marginLeft: "5px" }}>{label}</label>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <input type="date" value={dateValue} onChange={onDateChange} disabled={!enabled} style={inputStyle(enabled)} />
                <input type="time" value={timeValue} onChange={onTimeChange} disabled={!enabled} style={inputStyle(enabled)} />
                {timeValue && (
                    <button onClick={onClearTime} style={clearButtonStyle}>
                        X
                    </button>
                )}
            </div>
        </div>
    );
}

function TextFilter({ label, filterName, filterValue, enabled, onCheckboxChange, onFilterChange }) {
    return (
        <div>
            <input type="checkbox" checked={enabled} onChange={onCheckboxChange} />
            <label style={{ marginLeft: "5px" }}>{label}</label>
            <input
                type="text"
                placeholder={enabled ? "Nombre del Reservante" : ""}
                value={enabled ? filterValue : "Nombre Reservante"}
                onChange={(e) => onFilterChange(filterName, e.target.value)}
                disabled={!enabled}
                style={{
                    backgroundColor: enabled ? "#fff" : "#e0e0e0",
                    color: enabled ? "#000" : "#777",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
        </div>
    );
}
// ESTILOS
const filterRowStyle = {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
};

const inputStyle = (enabled) => ({
    backgroundColor: enabled ? "#fff" : "#e0e0e0",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
});

const selectStyle = (enabled) => ({
    backgroundColor: enabled ? "#fff" : "#e0e0e0",
});

const resetButtonStyle = {
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
};

const clearButtonStyle = {
    backgroundColor: "#d33",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px",
    cursor: "pointer",
};