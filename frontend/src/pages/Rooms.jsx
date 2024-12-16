import { useEffect, useState } from "react";
import RoomSearch from "../components/rooms/RoomSearch";
import RoomTable from "../components/rooms/RoomTable";
import RoomForm from "../components/rooms/RoomForm";
import { useCreateRoom } from "../hooks/rooms/useCreateRoom";
import { useGetRooms } from "../hooks/rooms/useGetRooms";

export default function Rooms() {
    const { rooms, fetchRooms, loading: loadingRooms } = useGetRooms();
    const { handleCreate, loading: loadingCreate } = useCreateRoom(fetchRooms);

    const [filteredRooms, setFilteredRooms] = useState([]);
    const [filters, setFilters] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    useEffect(() => {
        // Filtrar salas basadas en filtros activos
        let results = rooms;

        if (filters.id) {
            results = results.filter((room) => room.id.toString() === filters.id);
        }
        if (filters.name) {
            results = results.filter((room) =>
                room.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        if (filters.size) {
            results = results.filter((room) => room.size.replace(" m²", "") === filters.size);
        }
        if (filters.roomType) {
            results = results.filter((room) => room.roomType === filters.roomType);
        }

        setFilteredRooms(results);
    }, [filters, rooms]);

    const handleSearchGeneral = (query) => {
        if (!query) {
            setFilteredRooms(rooms);
        } else {
            const results = rooms.filter((room) =>
                `${room.id} ${room.name.toLowerCase()} ${room.size} ${room.roomType.toLowerCase()}`.includes(
                    query.toLowerCase()
                )
            );
            setFilteredRooms(results);
        }
    };

    const handleFilterUpdate = (filter, value) => {
        setFilters((prev) => ({
            ...prev,
            [filter]: value.trim(),
        }));
    };

    const handleResetFilters = () => {
        setFilters({});
        setFilteredRooms(rooms); // Restablecer todas las salas
    };    

    return (
        <div>
            {/* Título Principal */}
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Salas</h1>

            {/* Buscar Sala */}
            <h3>Buscar Sala</h3>
            <RoomSearch
                onSearch={handleSearchGeneral}
                onFilterUpdate={handleFilterUpdate}
                onReset={handleResetFilters}
                loading={loadingRooms}
            />

            {/* Lista de Salas y Botón Crear */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "10px",
                }}
            >
                <h3>Lista de Salas</h3>
                <button
                    onClick={() => setShowCreateModal(true)} // Mostrar el modal
                    style={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 15px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Crear Sala
                </button>
            </div>

            {/* Tabla de Salas */}
            <RoomTable rooms={filteredRooms} />

            {/* Modal Crear Sala */}
            {showCreateModal && (
                <RoomForm
                    onCreate={handleCreate} // Lógica para crear la sala
                    loading={loadingCreate}
                    onClose={() => setShowCreateModal(false)} // Cerrar modal
                />
            )}
        </div>
    );
}