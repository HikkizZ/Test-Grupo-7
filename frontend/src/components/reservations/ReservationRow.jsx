import { useState, useEffect } from "react";

export default function ReservationRow({
    reservation,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
    user,
    hideDevuelto,
    hideActions, // Nueva propiedad para ocultar Acciones
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editState, setEditState] = useState(reservation.estado);
    const [editDevuelto, setEditDevuelto] = useState(reservation.devuelto);

    useEffect(() => {
        if (editState === "rechazada") {
            setEditDevuelto(true);
        } else if (editState === "pendiente") {
            setEditDevuelto(false);
        }
    }, [editState]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditState(reservation.estado);
        setEditDevuelto(reservation.devuelto);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditState(reservation.estado);
        setEditDevuelto(reservation.devuelto);
    };

    const handleSaveEdit = () => {
        if (onUpdate) {
            onUpdate(reservation.id, { estado: editState, devuelto: editDevuelto });
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
            <td>{reservation.estado}</td>
            {!hideDevuelto && <td>{reservation.devuelto ? "Sí" : "No"}</td>}
            <td>{reservanteNombre}</td>
            <td>
                {reservation.tipoReserva === "sala"
                    ? reservation.Sala?.nombre || "No disponible"
                    : reservation.Recurso?.nombre || "No disponible"}
            </td>
            {!hideActions && ( // Ocultar columna Acciones
                <td>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSaveEdit}
                                disabled={loadingUpdate}
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "5px 10px",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Guardar
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                disabled={loadingUpdate}
                                style={{
                                    backgroundColor: "#d33",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            {onUpdate && (
                                <button
                                    onClick={handleEditClick}
                                    disabled={loadingUpdate}
                                    style={{
                                        backgroundColor: "#cc8400",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                        marginRight: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Modificar
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={() => onDelete(reservation.id)}
                                    disabled={loadingDelete}
                                    style={{
                                        backgroundColor: "#d33",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                    }}
                                >
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