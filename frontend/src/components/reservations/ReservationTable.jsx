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
    
    const parseFechaDesde = (fecha) => {
        return parse(fecha, "dd-MM-yyyy HH:mm", new Date());
    };


    const filteredReservations = reservations.filter((reservation) => {
        const reservanteNombre = reservation.Reservante?.nombre || "-------";


    const filteredReservations = reservations.filter((reservation) => {
        const reservanteNombre = reservation.Reservante?.nombre || "-------";


        if (filters?.fechaDesde && !reservation.fechaDesde.startsWith(filters.fechaDesde)) {
            return false;
        }

        if (filters?.fechaHasta && !reservation.fechaHasta.startsWith(filters.fechaHasta)) {
            return false;
        }

        if (filters?.devuelto && reservation.devuelto.toString() !== filters.devuelto) {
            return false;
        }
        if (filters?.tipoReserva && reservation.tipoReserva !== filters.tipoReserva) {
            return false;
        }
        if (filters?.estado && reservation.estado !== filters.estado) {
            return false;
        }
        if (
            filters?.reservante &&
            !reservanteNombre.toLowerCase().includes(filters.reservante.toLowerCase())
        ) {
            return false;
        }

        return true;
    });

    const sortedReservations = [...filteredReservations].sort((a, b) => {
        const dateA = parseFechaDesde(a.fechaDesde);
        const dateB = parseFechaDesde(b.fechaDesde);
        return dateA - dateB;
    });

    return (
        <div className="around-table-container">
            <table className="around-table">
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
        </div>
    );
}