import ReservationRow from "./ReservationRow";
import { parse } from "date-fns";

export default function ReservationTable({ reservations, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    // Función para convertir fechaDesde en objeto Date
    const parseFechaDesde = (fecha) => {
        return parse(fecha, "dd-MM-yyyy HH:mm", new Date());
    };

    // Ordenar reservaciones por fechaDesde (ascendente)
    const sortedReservations = [...reservations].sort((a, b) => {
        const dateA = parseFechaDesde(a.fechaDesde); // Parsear fecha
        const dateB = parseFechaDesde(b.fechaDesde);
        return dateA - dateB; // Orden ascendente
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Fecha Desde</th>
                    <th>Fecha Hasta</th>
                    <th>Tipo Reserva</th>
                    <th>Estado</th>
                    <th>Devuelto</th>
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
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center" }}>No se encontraron reservaciones.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}