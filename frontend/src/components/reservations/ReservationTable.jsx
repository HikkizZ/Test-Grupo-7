import ReservationRow from "./ReservationRow";
import { parse } from "date-fns";

export default function ReservationTable({ reservations, onUpdate, onDelete, loadingUpdate, loadingDelete, hideDevuelto, user }) {
    // Función para convertir fechaDesde en objeto Date
    const parseFechaDesde = (fecha) => {
        return parse(fecha, "dd-MM-yyyy HH:mm", new Date());
    };

    // Ordenar reservaciones por fechaDesde (ascendente)
    const sortedReservations = [...reservations]
        .filter((reservation) => {
            // Aplicar filtro especial solo para roles Profesor y Alumno
            if (user?.role === "Profesor" || user?.role === "Alumno") {
                const reservanteNombre = reservation.Reservante?.nombre || "-------";
                const estado = reservation.estado;

                if (
                    reservanteNombre === "-------" &&
                    (estado === "pendiente" || estado === "rechazada")
                ) {
                    return false; // No mostrar si nombre es "-------" y estado pendiente/rechazada
                }
            }
            return true;
        })
        .sort((a, b) => {
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
                    {!hideDevuelto && <th>Devuelto</th>} {/* Ocultar si hideDevuelto es true */}
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
                            user={user} // Pasar el usuario autenticado
                            hideDevuelto={hideDevuelto}
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