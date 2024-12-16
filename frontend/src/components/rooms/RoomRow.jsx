import { useState } from "react";

export default function RoomRow({ room, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: room.name,
        size: room.size.replace(" m²", ""), // Remover "m²" para la edición
        roomType: room.roomType,
    });

    // Manejar cambios en los inputs
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
            size: room.size.replace(" m²", ""),
            roomType: room.roomType,
        });
    };

    const handleSaveEdit = () => {
        onUpdate(room.name, { // Usar el nombre como identificador para actualizar
            ...editData,
            size: parseFloat(editData.size), // Asegurar que el tamaño es un número válido
        });
        setIsEditing(false);
    };

    return (
        <tr>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        disabled={loadingUpdate}
                        placeholder="Nombre"
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                ) : (
                    room.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="number"
                        value={editData.size}
                        onChange={(e) => handleChange("size", e.target.value)}
                        disabled={loadingUpdate}
                        placeholder="Tamaño"
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                ) : (
                    room.size
                )}
            </td>
            <td>
                {isEditing ? (
                    <select
                        value={editData.roomType}
                        onChange={(e) => handleChange("roomType", e.target.value)}
                        disabled={loadingUpdate}
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        <option value="laboratorio">Laboratorio</option>
                        <option value="computacion">Computación</option>
                        <option value="clases">Clases</option>
                    </select>
                ) : (
                    room.roomType
                )}
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
                        <button
                            onClick={() => onDelete(room.name)} // Usar nombre como identificador para eliminar
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
                    </>
                )}
            </td>
        </tr>
    );
}