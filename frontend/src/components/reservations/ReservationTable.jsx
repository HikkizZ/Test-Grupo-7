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
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation) => (
                    <ReservationRow
                        key={reservation.id}
                        reservation={reservation}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        loadingUpdate={loadingUpdate}
                        loadingDelete={loadingDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}
