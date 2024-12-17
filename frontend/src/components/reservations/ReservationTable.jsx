import ReservationRow from "./ReservationRow";
import { parse } from "date-fns";

export default function ReservationTable({
    reservations,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
    user,
    hideDevuelto,
}) {
    // Función para convertir fechaDesde en objeto Date
    const parseFechaDesde = (fecha) => {
        return parse(fecha, "dd-MM-yyyy HH:mm", new Date());
    };

    // **Filtrado inicial**: Aplica la validación 1
    const filteredReservations = reservations.filter((reservation) => {
        const reservanteNombre = reservation.Reservante?.nombre || "-------";

        // VALIDACIÓN 1: Excluir filas si el Reservante no coincide y estado es "pendiente" o "rechazada"
        if (
            (user?.role === "Profesor" || user?.role === "Alumno") &&
            reservanteNombre !== user?.name &&
            (reservation.estado === "pendiente" || reservation.estado === "rechazada")
        ) {
            console.log("Excluyendo reserva. Reservante:", reservanteNombre, "Estado:", reservation.estado);
            return false; // Excluir la fila
        }

        return true; // Mantener la fila
    });

    // Ordenar reservaciones por fechaDesde (ascendente)
    const sortedReservations = [...filteredReservations].sort((a, b) => {
        const dateA = parseFechaDesde(a.fechaDesde);
        const dateB = parseFechaDesde(b.fechaDesde);
        return dateA - dateB;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Fecha Desde</th>
                    <th>Fecha Hasta</th>
                    <th>Tipo Reserva</th>
                    <th>Estado</th>
                    {!hideDevuelto && <th>Devuelto</th>}
                    <th>Reservante</th>
                    <th>Sala/Recurso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sortedReservations.length > 0 ? (
                    sortedReservations.map((reservation) => (
                        <ReservationRow
                            key={reservation.id}
                            reservation={reservation}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            loadingUpdate={loadingUpdate}
                            loadingDelete={loadingDelete}
                            user={user}
                            hideDevuelto={hideDevuelto}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center" }}>
                            No se encontraron reservaciones.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}