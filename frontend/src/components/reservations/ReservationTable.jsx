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
    filters,
}) {
    // Función para convertir fechaDesde en objeto Date
    const parseFechaDesde = (fecha) => {
        return parse(fecha, "dd-MM-yyyy HH:mm", new Date());
    };

    // Función para filtrar las reservaciones
    const filteredReservations = reservations.filter((reservation) => {
        const reservanteNombre = reservation.Reservante?.nombre || "-------";

        // Filtrar por Devuelto
        if (filters?.devuelto && reservation.devuelto?.toString() !== filters.devuelto) {
            return false;
        }

        // Filtrar por Tipo de Reserva
        if (filters?.tipoReserva && reservation.tipoReserva !== filters.tipoReserva) {
            return false;
        }

        // Filtrar por Estado
        if (filters?.estado && reservation.estado !== filters.estado) {
            return false;
        }

        // Filtrar por Fecha Desde
        if (filters?.fechaDesde) {
            const fechaDesdeFiltro = parseFechaDesde(filters.fechaDesde);
            const fechaReserva = parseFechaDesde(reservation.fechaDesde);
            if (fechaReserva < fechaDesdeFiltro) {
                return false;
            }
        }

        // Filtrar por Fecha Hasta
        if (filters?.fechaHasta) {
            const fechaHastaFiltro = parseFechaDesde(filters.fechaHasta);
            const fechaReserva = parseFechaDesde(reservation.fechaHasta);
            if (fechaReserva > fechaHastaFiltro) {
                return false;
            }
        }

        // Filtrar por Reservante (nombre)
        if (filters?.reservante && !reservanteNombre.toLowerCase().includes(filters.reservante.toLowerCase())) {
            return false;
        }

        // Lógica especial para Profesor y Alumno
        if (user?.role === "Profesor" || user?.role === "Alumno") {
            if (reservanteNombre.trim() === "-------" && reservation.estado !== "aprobada") {
                return false; // Excluir si no es aprobada
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
                    {onUpdate || onDelete ? <th>Acciones</th> : null}
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