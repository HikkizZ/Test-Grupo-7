import { useEffect, useState } from "react";
import RoomSearch from "../components/rooms/RoomSearch";
import RoomTable from "../components/rooms/RoomTable";
import RoomForm from "../components/rooms/RoomForm";
import { useCreateRoom } from "../hooks/rooms/useCreateRoom";
import { useGetRooms } from "../hooks/rooms/useGetRooms";
import { useUpdateRoom } from "../hooks/rooms/useUpdateRoom";
import { useDeleteRoom } from "../hooks/rooms/useDeleteRoom";
import { useAuth } from "../context/AuthContext";
import "../styles/around.css"; // Importar los estilos de around.css

export default function Rooms() {
    const { user } = useAuth();
    const { rooms, fetchRooms, loading: loadingRooms } = useGetRooms();
    const { handleCreate, loading: loadingCreate } = useCreateRoom(fetchRooms);
    const { handleUpdate, loading: loadingUpdate } = useUpdateRoom(fetchRooms);
    const { handleDelete, loading: loadingDelete } = useDeleteRoom({ setRooms: fetchRooms });

    const [filteredRooms, setFilteredRooms] = useState([]); // Estado de filtrado
    const [filters, setFilters] = useState({}); // Filtros aplicados
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchRooms(); // Cargar las salas al montar el componente
    }, [fetchRooms]);

    useEffect(() => {
        setFilteredRooms(rooms); // Inicializa las salas al cargarlas
    }, [rooms]);

    const handleFilterUpdate = (filter, value) => {
        const updatedFilters = { ...filters, [filter]: value.trim() };
        setFilters(updatedFilters);

        let results = rooms; // Filtrar a partir del estado original de las salas

        // Aplicar filtros individuales
        if (updatedFilters.name) {
            results = results.filter((room) =>
                room.name.toLowerCase().includes(updatedFilters.name.toLowerCase())
            );
        }
        if (updatedFilters.size) {
            results = results.filter((room) =>
                room.size.replace(" m²", "") === updatedFilters.size
            );
        }
        if (updatedFilters.roomType) {
            results = results.filter((room) => room.roomType === updatedFilters.roomType);
        }

        setFilteredRooms(results);
    };

    const handleResetFilters = () => {
        setFilters({});
        setFilteredRooms(rooms); // Reinicia las salas al estado original
    };

    return (
            <div className="around-container">
                {/* Título principal centrado */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <h1 className="around-header">
                        <br />
                        <br />
                        Salas</h1>
                </div>

            {/* Buscar Sala */}
            <div className="around-section">
                <h3 className="around-subtitle">Buscar Sala</h3>
                <RoomSearch
                    onSearch={(query) => {
                        const filtered = rooms.filter((room) =>
                            `${room.name.toLowerCase()} ${room.size} ${room.roomType.toLowerCase()}`.includes(
                                query.toLowerCase()
                            )
                        );
                        setFilteredRooms(filtered);
                    }}
                    onFilterUpdate={handleFilterUpdate}
                    onReset={handleResetFilters}
                    loading={loadingRooms}
                />
            </div>

        {/* Lista de Salas */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <h3>Lista de Salas</h3>
            {user?.role === "admin" && (
                <div className="create-button-container">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="create-button"
                    >
                        Crear Sala
                    </button>
                </div>
            )}
        </div>

            <RoomTable
                rooms={filteredRooms} // Renderiza el estado filtrado
                onUpdate={["admin", "Encargado"].includes(user?.role) ? handleUpdate : null}
                onDelete={user?.role === "admin" ? handleDelete : null}
                loadingUpdate={loadingUpdate}
                loadingDelete={loadingDelete}
                role={user?.role}
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