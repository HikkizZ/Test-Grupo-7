import { useState, useEffect } from "react";

export default function ReservationRow({ reservation, onUpdate, onDelete, loadingUpdate, loadingDelete, user, hideDevuelto }) {
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

    // VALIDACIÓN 2: Reemplazar nombre si no coincide
    let reservanteNombre = reservation.Reservante?.nombre || "-------";

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
                        style={{ width: "100%", padding: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                    </select>
                ) : (
                    reservation.estado
                )}
            </td>
            {!hideDevuelto && <td>{reservation.devuelto ? "Sí" : "No"}</td>}
            <td>{reservanteNombre}</td>
            <td>
                {reservation.tipoReserva === "sala"
                    ? reservation.Sala?.nombre || "No disponible"
                    : reservation.Recurso?.nombre || "No disponible"}
            </td>
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
        </tr>
    );
}