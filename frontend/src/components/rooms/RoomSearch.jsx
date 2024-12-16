import { useState } from "react";

export default function RoomSearch({ onSearch, onReset, loading }) {
    const [filters, setFilters] = useState({
        id: "",
        name: "",
        size: "",
        roomType: "",
    });

    const [filterEnabled, setFilterEnabled] = useState({
        id: false,
        name: false,
        size: false,
        roomType: false,
    });

    const handleFilterChange = (filter, value) => {
        setFilters((prev) => ({ ...prev, [filter]: value }));
        onSearch({ ...filters, [filter]: value });
    };

    const handleCheckboxChange = (filter) => {
        setFilterEnabled((prev) => ({ ...prev, [filter]: !prev[filter] }));
        if (filterEnabled[filter]) {
            handleFilterChange(filter, "");
        }
    };

    const resetFilters = () => {
        setFilters({ id: "", name: "", size: "", roomType: "" });
        setFilterEnabled({ id: false, name: false, size: false, roomType: false });
        onReset();
    };

    const filtersActive = Object.values(filterEnabled).some((enabled) => enabled);

    return (
        <div>
            <h3>Filtros de Búsqueda</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {["id", "name", "size", "roomType"].map((filter) => (
                    <div key={filter}>
                        <input
                            type="checkbox"
                            checked={filterEnabled[filter]}
                            onChange={() => handleCheckboxChange(filter)}
                        />
                        <label style={{ marginLeft: "5px" }}>
                            {filter === "id" ? "ID" : filter === "name" ? "Nombre" : filter === "size" ? "Tamaño (m²)" : "Tipo"}
                        </label>
                        <input
                            type={filter === "size" ? "number" : "text"}
                            value={filters[filter]}
                            onChange={(e) => handleFilterChange(filter, e.target.value)}
                            disabled={!filterEnabled[filter]}
                            placeholder={
                                filter === "id"
                                    ? "Ingrese ID"
                                    : filter === "name"
                                    ? "Ingrese Nombre"
                                    : filter === "size"
                                    ? "Ingrese Tamaño"
                                    : "Ingrese Tipo (laboratorio, computacion, clases)"
                            }
                            style={{
                                marginTop: "5px",
                                width: "100%",
                                padding: "5px",
                                backgroundColor: filterEnabled[filter] ? "#fff" : "#e0e0e0",
                            }}
                        />
                    </div>
                ))}
            </div>
            {filtersActive && (
                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={resetFilters}
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "10px 20px",
                            cursor: "pointer",
                        }}
                    >
                        Resetear Filtros
                    </button>
                </div>
            )}
            {loading && <p>Cargando...</p>}
        </div>
    );
}