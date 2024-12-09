export default function ReservationRow({ reservation, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    return (
        <tr>
            <td>{reservation.id}</td>
            <td>{reservation.fechaDesde}</td>
            <td>{reservation.fechaHasta}</td>
            <td>{reservation.tipoReserva}</td>
            <td>{reservation.estado}</td>
            <td>{reservation.devuelto ? "Sí" : "No"}</td>
            <td>
                <button onClick={() => onUpdate(reservation.id)} disabled={loadingUpdate}>
                    Modificar
                </button>
                <button onClick={() => onDelete(reservation.id)} disabled={loadingDelete}>
                    Eliminar
                </button>
            </td>
        </tr>
    );
}
