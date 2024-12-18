import { useState } from "react";
import { showErrorAlert } from "../../utils/alerts";

export default function RoomRow({
    room,
    onSelect,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
    role,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: room.name,
        capacity: room.capacity.replace(" alumnos", ""), 
        roomType: room.roomType,
    });

    const handleChange = (field, value) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({
            name: room.name,
            capacity: room.capacity.replace(" alumnos", ""),
            roomType: room.roomType,
        });
    };

    const handleSaveEdit = () => {
        if (!editData.capacity || parseInt(editData.capacity) <= 0) {
            showErrorAlert("Capacidad inválida", "La Capacidad de alumnos debe ser un número mayor que 0.");
            return;
        }

        onUpdate(room.id, {
            ...editData,
            capacity: parseInt(editData.capacity),
        });
        setIsEditing(false);
    };

    return (
        <tr>
            {/* Columna Nombre */}
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        disabled={loadingUpdate}
                        placeholder="Nombre"
                        style={{ width: "100%", padding: "5px" }}
                    />
                ) : (
                    room.name
                )}
            </td>

            {/* Columna Capacidad */}
            <td>
                {isEditing ? (
                    <input
                        type="number"
                        value={editData.capacity}
                        onChange={(e) => handleChange("capacity", e.target.value)}
                        disabled={loadingUpdate}
                        placeholder="Capacidad de Alumnos"
                        style={{ width: "100%", padding: "5px" }}
                    />
                ) : (
                    room.capacity
                )}
            </td>

            {/* Columna Tipo de Sala */}
            <td>
                {isEditing ? (
                    <select
                        value={editData.roomType}
                        onChange={(e) => handleChange("roomType", e.target.value)}
                        disabled={loadingUpdate}
                        style={{ width: "100%", padding: "5px" }}
                    >
                        <option value="laboratorio">Laboratorio</option>
                        <option value="computacion">Computación</option>
                        <option value="clases">Clases</option>
                    </select>
                ) : (
                    room.roomType
                )}
            </td>

            {/* Columna Acciones */}
            <td>
                {onSelect ? (
                    <button
                        onClick={() => onSelect(room)}
                        style={{
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        Seleccionar
                    </button>
                ) : isEditing ? (
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

                        {onDelete && role === "admin" && (
                            <button
                                onClick={() => onDelete(room.id)}
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