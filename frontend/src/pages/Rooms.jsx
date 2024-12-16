import { useEffect, useState } from "react";
import { useCreateRoom } from "../hooks/rooms/useCreateRoom";
import { useGetRooms } from "../hooks/rooms/useGetRooms";
import { useSearchRoom } from "../hooks/rooms/useSearchRoom";
import { useUpdateRoom } from "../hooks/rooms/useUpdateRoom";
import { useDeleteRoom } from "../hooks/rooms/useDeleteRoom";
import RoomTable from "../components/rooms/RoomTable";
import RoomSearch from "../components/rooms/RoomSearch";
import RoomForm from "../components/rooms/RoomForm";

export default function Rooms() {
    const { rooms, fetchRooms, loading: loadingRooms } = useGetRooms();
    const { handleCreate, loading: loadingCreate } = useCreateRoom(fetchRooms);
    const { handleUpdate, loading: loadingUpdate } = useUpdateRoom(fetchRooms);

    const [searchResults, setSearchResults] = useState([]);
    const [filters, setFilters] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { handleDelete, loading: loadingDelete } = useDeleteRoom({
        rooms,
        setRooms: fetchRooms,
        searchResults,
        setSearchResults,
    });

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            const filteredRooms = rooms.filter((room) => {
                return Object.keys(filters).every((key) =>
                    room[key]?.toString().toLowerCase().includes(filters[key]?.toString().toLowerCase())
                );
            });
            setSearchResults(filteredRooms);
        } else {
            setSearchResults(rooms);
        }
    }, [filters, rooms]);

    const handleSearch = (newFilters) => {
        setFilters(newFilters);
    };

    const handleReset = () => {
        setFilters({});
        setSearchResults(rooms);
    };

    const noRooms = rooms.length === 0;
    const noSearchResults = searchResults.length === 0 && !noRooms;

    return (
        <div>
            <br />
            <br />
            <h1>Salas</h1>

            {/* Buscar sala */}
            <RoomSearch onSearch={handleSearch} onReset={handleReset} loading={loadingRooms} />

            {/* Lista de salas y botón Crear */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <h3>Lista de Salas</h3>
                <button
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        height: "38px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                    }}
                >
                    Crear Sala
                </button>
            </div>

            {loadingRooms ? (
                <p>Cargando salas...</p>
            ) : noRooms ? (
                <p>No hay salas registradas.</p>
            ) : noSearchResults ? (
                <p>No se encontraron salas que coincidan con los filtros aplicados.</p>
            ) : (
                <RoomTable
                    rooms={searchResults}
                    onDelete={handleDelete}
                    loadingDelete={loadingDelete}
                    onUpdate={handleUpdate}
                    loadingUpdate={loadingUpdate}
                />
            )}

            {/* Modal para Crear Sala */}
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