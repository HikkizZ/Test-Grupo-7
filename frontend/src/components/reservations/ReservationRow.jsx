import { useState, useEffect } from "react";

export default function ReservationRow({
    reservation,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
    user,
    hideDevuelto,
    hideActions,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editState, setEditState] = useState(reservation.estado);
    const [editDevuelto, setEditDevuelto] = useState(reservation.devuelto ? "Sí" : "No");

    useEffect(() => {
        // Actualizar "Devuelto" automáticamente cuando "Estado" cambia
        if (editState === "pendiente") {
            setEditDevuelto("No");
        } else if (editState === "rechazada") {
            setEditDevuelto("Sí");
        }
    }, [editState]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditState(reservation.estado);
        setEditDevuelto(reservation.devuelto ? "Sí" : "No");
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditState(reservation.estado);
        setEditDevuelto(reservation.devuelto ? "Sí" : "No");
    };

    const handleSaveEdit = () => {
        if (onUpdate) {
            onUpdate(reservation.id, {
                estado: editState,
                devuelto: editDevuelto === "Sí",
            });
        }
        setIsEditing(false);
    };

    // Mostrar el nombre del reservante
    let reservanteNombre = reservation.Reservante?.nombre || "No disponible";
    if ((user?.role === "Profesor" || user?.role === "Alumno") && reservanteNombre !== user?.name) {
        reservanteNombre = "-------";
    }

    return (
        <tr>
            <td>{reservation.fechaDesde}</td>
            <td>{reservation.fechaHasta}</td>
            <td>{reservation.tipoReserva}</td>
            <td>
                {isEditing ? (
                    <select
                        value={editState}
                        onChange={(e) => setEditState(e.target.value)}
                        disabled={loadingUpdate}
                        style={{ width: "100%" }}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                    </select>
                ) : (
                    reservation.estado
                )}
            </td>
            {!hideDevuelto && (
                <td>
                    {isEditing ? (
                        <select
                            value={editDevuelto}
                            onChange={(e) => setEditDevuelto(e.target.value)}
                            disabled={
                                editState === "pendiente" || editState === "rechazada" || loadingUpdate
                            }
                            style={{ width: "100%" }}
                        >
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </select>
                    ) : (
                        reservation.devuelto ? "Sí" : "No"
                    )}
                </td>
            )}
            <td>{reservanteNombre}</td>
            <td>
                {reservation.tipoReserva === "sala"
                    ? reservation.Sala?.nombre || "No disponible"
                    : reservation.Recurso?.nombre || "No disponible"}
            </td>
            {!hideActions && (
                <td>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSaveEdit}
                                disabled={loadingUpdate}
                                style={{ marginRight: "5px" }}
                            >
                                Guardar
                            </button>
                            <button onClick={handleCancelEdit} disabled={loadingUpdate}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            {onUpdate && (
                                <button
                                    onClick={handleEditClick}
                                    disabled={loadingUpdate}
                                    style={{ marginRight: "5px" }}
                                >
                                    Modificar
                                </button>
                            )}
                            {onDelete && (
                                <button onClick={() => onDelete(reservation.id)} disabled={loadingDelete}>
                                    Eliminar
                                </button>
                            )}
                        </>
                    )}
                </td>
            )}
        </tr>
    );
}