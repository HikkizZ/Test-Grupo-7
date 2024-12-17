import { useEffect, useState } from "react";
import RoomSearch from "../components/rooms/RoomSearch";
import RoomTable from "../components/rooms/RoomTable";
import RoomForm from "../components/rooms/RoomForm";
import { useCreateRoom } from "../hooks/rooms/useCreateRoom";
import { useGetRooms } from "../hooks/rooms/useGetRooms";
import { useUpdateRoom } from "../hooks/rooms/useUpdateRoom";
import { useDeleteRoom } from "../hooks/rooms/useDeleteRoom";
import { useAuth } from "../context/AuthContext";

export default function Rooms() {
    const { user } = useAuth(); // Accede al rol del usuario autenticado
    const { rooms, fetchRooms, loading: loadingRooms } = useGetRooms();
    const { handleCreate, loading: loadingCreate } = useCreateRoom(fetchRooms);
    const { handleUpdate, loading: loadingUpdate } = useUpdateRoom(fetchRooms);
    const { handleDelete, loading: loadingDelete } = useDeleteRoom({
        setRooms: fetchRooms,
    });

    const [setFilteredRooms] = useState([]);
    const [setFilters] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

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
            <br />
            <h1 style={{ textAlign: "center" }}>Salas</h1>

            {/* Buscar Sala */}
            <h3>Buscar Sala</h3>
            <RoomSearch
                onSearch={(query) =>
                    setFilteredRooms(
                        rooms.filter((room) =>
                            `${room.name.toLowerCase()} ${room.size} ${room.roomType.toLowerCase()}`.includes(
                                query.toLowerCase()
                            )
                        )
                    )
                }
                onFilterUpdate={handleFilterUpdate}
                onReset={handleResetFilters}
                loading={loadingRooms}
            />

            {/* Lista de Salas */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <h3>Lista de Salas</h3>
                {user?.role === "admin" && ( // Solo el admin puede ver el botón de crear
                    <button
                        onClick={() => setShowCreateModal(true)}
                        style={{
                            height: "38px",
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
                )}
            </div>

            <RoomTable
                rooms={rooms}
                onUpdate={["admin", "Encargado"].includes(user?.role) ? handleUpdate : null} // Solo Admin y Encargado
                onDelete={user?.role === "admin" ? handleDelete : null} // Solo Admin
                loadingUpdate={loadingUpdate}
                loadingDelete={loadingDelete}
                role={user?.role} // Pasar el rol al componente
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