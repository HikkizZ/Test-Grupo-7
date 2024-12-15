import ReservationRow from "./ReservationRow";

export default function ReservationTable({ reservations, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
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
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
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
                        <td colSpan="9" style={{ textAlign: "center" }}>No se encontraron reservaciones.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
