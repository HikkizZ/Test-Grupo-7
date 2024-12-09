import { useEffect, useState } from "react";
import { useCreateReservation } from "../hooks/reservations/useCreateReservation";
import { useGetReservations } from "../hooks/reservations/useGetReservations";
import { useSearchReservation } from "../hooks/reservations/useSearchReservation";
import { useUpdateReservation } from "../hooks/reservations/useUpdateReservation";
import { useDeleteReservation } from "../hooks/reservations/useDeleteReservation";
import ReservationTable from "../components/reservations/ReservationTable";
import ReservationForm from "../components/reservations/ReservationForm";
import ReservationSearch from "../components/reservations/ReservationSearch";

export default function Reservations() {
    const { reservations, fetchReservations, loading: loadingReservations } = useGetReservations();
    const { handleCreate, loading: loadingCreate } = useCreateReservation(fetchReservations);
    const { handleUpdate, loading: loadingUpdate } = useUpdateReservation(fetchReservations);

    const [searchResults, setSearchResults] = useState(reservations); // Estado de resultados de búsqueda
    const [showCreateModal, setShowCreateModal] = useState(false); // Control de visibilidad del modal

    const {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults: filteredResults,
        resetSearch,
        loading: loadingSearch,
        error: errorSearch,
    } = useSearchReservation(reservations);

    useEffect(() => {
        setSearchResults(filteredResults);
    }, [filteredResults]);

    const { handleDelete, loading: loadingDelete } = useDeleteReservation({
        reservations,
        setReservations: fetchReservations,
        searchResults,
        setSearchResults,
    });

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    const noReservations = reservations.length === 0;
    const noSearchResults = searchResults.length === 0 && !noReservations;

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Reservaciones</h1>

            {/* Buscar reservación */}
            <ReservationSearch
                onSearch={(query, filter) => {
                    setSearchQuery(query);
                    setSearchFilter(filter);
                }}
                onReset={resetSearch}
                loading={loadingSearch}
            />

            {/* Lista de reservaciones y botón Crear */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <h3>Lista de Reservaciones</h3>
                <button
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        height: "38px",
                        backgroundColor: "#28a745", // Verde para indicar creación
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                    }}
                >
                    Crear Reservación
                </button>
            </div>

            {loadingSearch || loadingReservations ? (
                <p>Cargando reservaciones...</p>
            ) : errorSearch ? (
                <p style={{ color: "red" }}>{errorSearch}</p>
            ) : noReservations ? (
                <p>No hay reservaciones registradas.</p>
            ) : noSearchResults ? (
                <p>No se encontraron reservaciones que coincidan con tu búsqueda.</p>
            ) : (
                <ReservationTable
                    reservations={searchResults}
                    onDelete={handleDelete}
                    loadingDelete={loadingDelete}
                    onUpdate={handleUpdate}
                    loadingUpdate={loadingUpdate}
                />
            )}

            {/* Modal para Crear Reservación */}
            {showCreateModal && (
                <ReservationForm
                    onCreate={handleCreate}
                    loading={loadingCreate}
                    onClose={() => setShowCreateModal(false)} // Manejo del cierre del modal
                />
            )}
        </div>
    );
}
