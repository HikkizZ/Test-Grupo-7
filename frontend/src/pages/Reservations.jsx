import { useEffect, useState } from "react";
import { useCreateReservation } from "../hooks/reservations/useCreateReservation";
import { useGetReservations } from "../hooks/reservations/useGetReservations";
import { useSearchReservation } from "../hooks/reservations/useSearchReservation";
import { useUpdateReservation } from "../hooks/reservations/useUpdateReservation";
import { useDeleteReservation } from "../hooks/reservations/useDeleteReservation";
import { useAuth } from "../context/AuthContext";
import ReservationTable from "../components/reservations/ReservationTable";
import ReservationForm from "../components/reservations/ReservationForm";
import ReservationSearch from "../components/reservations/ReservationSearch";

export default function Reservations() {
    const { user } = useAuth(); // Obtén el usuario autenticado
    const { reservations, fetchReservations, loading: loadingReservations } = useGetReservations();
    const { handleCreate, loading: loadingCreate } = useCreateReservation(fetchReservations);
    const { handleUpdate, loading: loadingUpdate } = useUpdateReservation(fetchReservations);
    const { handleDelete, loading: loadingDelete } = useDeleteReservation({
        reservations,
        setReservations: fetchReservations,
    });

    const { resetFilters, searchResults: filteredResults, loading: loadingSearch } =
        useSearchReservation(reservations);

    const [showCreateModal, setShowCreateModal] = useState(false);

    // Estado adicional para manejar los filtros
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    const handleFilterUpdate = (filterName, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };

    const handleResetFilters = () => {
        setFilters({});
        resetFilters(); // Resetea los filtros generales
    };

    const noReservations = reservations.length === 0;
    const noSearchResults = filteredResults.length === 0 && !noReservations;

    // Verificar si el usuario es Profesor o Alumno
    const isProfesorOrAlumno = user?.role === "Profesor" || user?.role === "Alumno";

    return (
        <div>
            <br />
            <br />
            <h1>Reservaciones</h1>

            {/* Buscar reservaciones */}
            <ReservationSearch
                onFilterUpdate={handleFilterUpdate}
                onReset={handleResetFilters}
                loading={loadingSearch}
            />

            {/* Lista de reservaciones y botón Crear */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <h3>Lista de Reservaciones</h3>
                {(user?.role === "admin" || user?.role === "Profesor" || user?.role === "Alumno") && (
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
                )}
            </div>

            {/* Tabla de reservaciones */}
            {loadingSearch || loadingReservations ? (
                <p>Cargando reservaciones...</p>
            ) : noReservations ? (
                <p>No hay reservaciones registradas.</p>
            ) : noSearchResults ? (
                <p>No se encontraron reservaciones que coincidan con los filtros aplicados.</p>
            ) : (
                <ReservationTable
                    reservations={filteredResults}
                    onUpdate={user?.role === "admin" || user?.role === "Encargado" ? handleUpdate : null}
                    onDelete={user?.role === "admin" ? handleDelete : null}
                    loadingDelete={loadingDelete}
                    loadingUpdate={loadingUpdate}
                    hideDevuelto={isProfesorOrAlumno}
                    user={user}
                    filters={filters} // Pasamos los filtros al componente ReservationTable
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