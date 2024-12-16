import { useEffect, useState } from "react";
import RoomSearch from "../components/rooms/RoomSearch";
import RoomTable from "../components/rooms/RoomTable";
import RoomForm from "../components/rooms/RoomForm";
import { useCreateRoom } from "../hooks/rooms/useCreateRoom";
import { useGetRooms } from "../hooks/rooms/useGetRooms";
import { useUpdateRoom } from "../hooks/rooms/useUpdateRoom";
import { useDeleteRoom } from "../hooks/rooms/useDeleteRoom";

export default function Rooms() {
    const { rooms, fetchRooms, loading: loadingRooms } = useGetRooms();
    const { handleCreate, loading: loadingCreate } = useCreateRoom(fetchRooms);
    const { handleUpdate, loading: loadingUpdate } = useUpdateRoom(fetchRooms);
    const { handleDelete, loading: loadingDelete } = useDeleteRoom({
        setRooms: fetchRooms,
    });

    const [filteredRooms, setFilteredRooms] = useState([]);
    const [filters, setFilters] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    useEffect(() => {
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

    const handleFilterUpdate = (filter, value) => {
        setFilters((prev) => ({
            ...prev,
            [filter]: value.trim(),
        }));
    };

    const handleResetFilters = () => {
        setFilters({});
        setFilteredRooms(rooms);
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Salas</h1>

            {/* Buscar Sala */}
            <h3>Buscar Sala</h3>
            <RoomSearch
                onSearch={(query) => setFilteredRooms(rooms.filter((room) =>
                    `${room.id} ${room.name.toLowerCase()} ${room.size} ${room.roomType.toLowerCase()}`.includes(
                        query.toLowerCase()
                    )))}
                onFilterUpdate={handleFilterUpdate}
                onReset={handleResetFilters}
                loading={loadingRooms}
            />

            {/* Lista de Salas */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <h3>Lista de Salas</h3>
                <button
                    onClick={() => setShowCreateModal(true)} // Mostrar el modal
                    style={{
                        height: "38px",
                        backgroundColor: "#28a745", // Color verde
                        color: "#fff", // Texto blanco
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

            <RoomTable
                rooms={filteredRooms}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                loadingUpdate={loadingUpdate}
                loadingDelete={loadingDelete}
            />

            {/* Modal Crear Sala */}
            {showCreateModal && (
                <RoomForm
                    onCreate={handleCreate}
                    loading={loadingCreate}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
}