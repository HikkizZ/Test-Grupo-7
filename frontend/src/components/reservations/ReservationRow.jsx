import { useState, useEffect } from "react";

export default function ReservationRow({ reservation, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editState, setEditState] = useState(reservation.estado);
    const [editDevuelto, setEditDevuelto] = useState(reservation.devuelto);

    useEffect(() => {
        // Actualizar el valor de devuelto si el estado cambia
        if (editState === "rechazada") {
            setEditDevuelto(true); // Siempre true si estado es rechazada
        } else if (editState === "pendiente") {
            setEditDevuelto(false); // Siempre false si estado es pendiente
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
        // Enviar los datos actualizados al backend
        if (onUpdate) {
            onUpdate(reservation.id, { estado: editState, devuelto: editDevuelto });
        }
        setIsEditing(false);
    };

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
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                    </select>
                ) : (
                    reservation.estado
                )}
            </td>
            <td>
                {isEditing ? (
                    editState === "aprobada" ? (
                        <select
                            value={editDevuelto ? "Sí" : "No"}
                            onChange={(e) => setEditDevuelto(e.target.value === "Sí")}
                            disabled={loadingUpdate}
                            style={{
                                width: "100%",
                                padding: "5px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        >
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </select>
                    ) : editState === "rechazada" ? (
                        <span>Sí</span>
                    ) : (
                        <span>No</span>
                    )
                ) : (
                    reservation.devuelto ? "Sí" : "No"
                )}
            </td>
            <td>{reservation.Reservante?.nombre || "No disponible"}</td>
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
                        {/* Solo mostrar el botón Modificar si onUpdate existe */}
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

                        {/* Solo mostrar el botón Eliminar si onDelete existe */}
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