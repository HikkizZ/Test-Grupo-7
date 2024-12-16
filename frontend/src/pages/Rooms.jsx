import { useEffect, useState } from "react";
import { useCreateRoom } from "../hooks/rooms/useCreateRoom";
import { useGetRooms } from "../hooks/rooms/useGetRooms";
import { useSearchRoom } from "../hooks/rooms/useSearchRoom";
import { useUpdateRoom } from "../hooks/rooms/useUpdateRoom";
import { useDeleteRoom } from "../hooks/rooms/useDeleteRoom";
import RoomTable from "../components/rooms/RoomTable";
import RoomForm from "../components/rooms/RoomForm";

export default function Rooms() {
    const { rooms, fetchRooms, loading: loadingRooms } = useGetRooms();
    const { handleCreate, loading: loadingCreate } = useCreateRoom(fetchRooms);
    const { handleUpdate, loading: loadingUpdate } = useUpdateRoom(fetchRooms);

    const [searchResults, setSearchResults] = useState(rooms);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults: filteredResults,
        resetSearch,
        loading: loadingSearch,
        error: errorSearch,
    } = useSearchRoom(rooms);

    useEffect(() => {
        setSearchResults(filteredResults);
    }, [filteredResults]);

    const { handleDelete, loading: loadingDelete } = useDeleteRoom({
        rooms,
        setRooms: fetchRooms,
        searchResults,
        setSearchResults,
    });

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const noRooms = rooms.length === 0;
    const noSearchResults = searchResults.length === 0 && !noRooms;

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Salas</h1>

            {/* Buscar sala */}
            <h3>Buscar Sala</h3>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                        searchFilter === "id"
                            ? "Buscar por ID"
                            : searchFilter === "name"
                            ? "Buscar por Nombre"
                            : searchFilter === "roomType"
                            ? "Buscar por Tipo de Sala"
                            : "Buscar sala"
                    }
                    style={{ flex: "1" }}
                />
                <select
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{
                        maxWidth: "200px",
                        minWidth: "150px",
                        height: "38px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "5px",
                    }}
                >
                    <option value="">--Seleccionar filtro--</option>
                    <option value="id">Buscar sala por ID</option>
                    <option value="name">Buscar sala por Nombre</option>
                    <option value="roomType">Buscar sala por Tipo</option>
                </select>
                {searchQuery && (
                    <button
                        onClick={resetSearch}
                        style={{
                            height: "38px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        Ver Todas las Salas
                    </button>
                )}
            </div>

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

            {loadingSearch || loadingRooms ? (
                <p>Cargando salas...</p>
            ) : errorSearch ? (
                <p style={{ color: "red" }}>{errorSearch}</p>
            ) : noRooms ? (
                <p>No hay salas registradas.</p>
            ) : noSearchResults ? (
                <p>No se encontraron salas que coincidan con tu búsqueda.</p>
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