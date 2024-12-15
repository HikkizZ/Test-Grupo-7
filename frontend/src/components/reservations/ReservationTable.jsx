import ReservationRow from "./ReservationRow";
import { parse } from "date-fns";

export default function ReservationTable({ reservations, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    // Función para convertir fechaDesde en objeto Date
    const parseFechaDesde = (fecha) => {
        console.log("Fecha a parsear:", fecha); // Log temporal para depurar
        return parse(fecha, "dd-MM-yyyy HH:mm", new Date());
    };    

    // Ordenar reservaciones por fechaDesde (ascendente)
    const sortedReservations = [...reservations].sort((a, b) => {
        const dateA = a.fechaDesde ? parseFechaDesde(a.fechaDesde, "dd-MM-yyyy HH:mm", new Date()) : new Date(0);
        const dateB = b.fechaDesde ? parseFechaDesde(b.fechaDesde, "dd-MM-yyyy HH:mm", new Date()) : new Date(0);
    
        return dateA - dateB; // Orden ascendente
    });    

    console.log("Reservaciones:", reservations);

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

