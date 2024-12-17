import { useState } from "react";
import { showErrorAlert } from "../../utils/alerts";

export default function RoomRow({ room, onUpdate, onDelete, loadingUpdate, loadingDelete, role }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: room.name,
        size: room.size.replace(" m²", ""), // Remover "m²" para edición
        roomType: room.roomType,
    });

    // Función para manejar cambios en los inputs
    const handleChange = (field, value) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Habilitar edición
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Cancelar edición
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({
            name: room.name,
            size: room.size.replace(" m²", ""),
            roomType: room.roomType,
        });
    };

    // Guardar cambios
    const handleSaveEdit = () => {
        // Validación del tamaño antes de actualizar
        if (!editData.size || parseFloat(editData.size) <= 0) {
            showErrorAlert(
                "Tamaño inválido",
                "El tamaño debe ser un número válido mayor que 0."
            );
            return; // Detener ejecución si la validación falla
        }
    
        // Si todo está bien, procede a actualizar
        onUpdate(room.id, {
            ...editData,
            size: parseFloat(editData.size), // Convertir tamaño a número flotante
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

            {/* Columna Tamaño */}
            <td>
                {isEditing ? (
                    <input
                        type="number"
                        value={editData.size}
                        onChange={(e) => handleChange("size", e.target.value)}
                        disabled={loadingUpdate}
                        placeholder="Tamaño en m²"
                        style={{ width: "100%", padding: "5px" }}
                    />
                ) : (
                    room.size
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
            {role !== "Profesor" && role !== "Alumno" && (
                <td>
                    {isEditing ? (
                        <>
                            {/* Botón Guardar */}
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

                            {/* Botón Cancelar */}
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
                            {/* Botón Modificar */}
                            {onUpdate && (
                                <button
                                    onClick={handleEditClick}
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
                                    Modificar
                                </button>
                            )}

                            {/* Botón Eliminar */}
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
            )}
        </tr>
    );
}