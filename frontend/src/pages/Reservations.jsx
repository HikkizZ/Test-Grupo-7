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
    const { handleDelete, loading: loadingDelete } = useDeleteReservation({
        reservations,
        setReservations: fetchReservations,
    });

    const {
        //searchFilters,
        updateFilter,
        resetFilters,
        searchResults: filteredResults,
        loading: loadingSearch,
    } = useSearchReservation(reservations);

    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    const noReservations = reservations.length === 0;
    const noSearchResults = filteredResults.length === 0 && !noReservations;

    return (
        <div>
            <h1>Reservaciones</h1>

            {/* Buscar reservaciones */}
            <ReservationSearch
                onFilterUpdate={updateFilter}
                onReset={resetFilters}
                loading={loadingSearch}
            />

            {/* Lista de reservaciones y botón Crear */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <h3>Lista de Reservaciones</h3>
                <button
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        backgroundColor: "#007bff",
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
            ) : noReservations ? (
                <p>No hay reservaciones registradas.</p>
            ) : noSearchResults ? (
                <p>No se encontraron reservaciones que coincidan con los filtros aplicados.</p>
            ) : (
                <ReservationTable
                    reservations={filteredResults}
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
                    onClose={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
}
