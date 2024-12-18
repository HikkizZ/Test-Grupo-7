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
        if (editState === "pendiente") setEditDevuelto("No");
        else if (editState === "rechazada") setEditDevuelto("Sí");
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
                        style={selectStyle}
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
                            disabled={loadingUpdate || editState === "pendiente" || editState === "rechazada"}
                            style={selectStyle}
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
                                style={buttonStyleBlue}
                            >
                                Guardar
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                disabled={loadingUpdate}
                                style={buttonStyleRed}
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
                                    style={buttonStyleOrange}
                                >
                                    Modificar
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={() => onDelete(reservation.id)}
                                    disabled={loadingDelete}
                                    style={buttonStyleRed}
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

const selectStyle = {
    width: "100%",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    fontSize: "14px",
};

const buttonStyleBlue = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "5px",
};

const buttonStyleRed = {
    backgroundColor: "#d33",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
};

const buttonStyleOrange = {
    backgroundColor: "#cc8400",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "5px",
};