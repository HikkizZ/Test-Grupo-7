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

    // Filtrado de reservaciones
    const filteredReservations = reservations.filter((reservation) => {
        const reservanteNombre = reservation.Reservante?.nombre || "-------";
        if (user?.role === "Profesor" || user?.role === "Alumno") {
            if (reservanteNombre.trim() === "-------" && reservation.estado !== "aprobada") {
                return false;
            }
        }
        return true;
    });

    // Ordenar reservaciones por fechaDesde (ascendente)
    const sortedReservations = [...filteredReservations].sort((a, b) => {
        const dateA = parseFechaDesde(a.fechaDesde);
        const dateB = parseFechaDesde(b.fechaDesde);
        return dateA - dateB;
    });

    // Determinar si se debe mostrar la columna Acciones
    const hideActions = user?.role === "Profesor" || user?.role === "Alumno";

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
                    {!hideActions && <th>Acciones</th>} {/* Ocultar Acciones */}
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
                            hideActions={hideActions} // Pasar la propiedad para la fila
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