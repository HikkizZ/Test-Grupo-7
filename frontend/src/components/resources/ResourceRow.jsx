import { useState } from "react";
import { showErrorAlert } from "../../utils/alerts";

export default function ResourceRow({
    resource,
    onSelect,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
    role,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: resource.name,
        brand: resource.brand,
        resourceType: resource.resourceType,
    });

    // Manejar cambios en inputs
    const handleChange = (field, value) => {
        setEditData((prev) => ({ ...prev, [field]: value }));
    };

    // Activar modo edición
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Cancelar edición
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({
            name: resource.name,
            brand: resource.brand,
            resourceType: resource.resourceType,
        });
    };

    // Guardar cambios
    const handleSaveEdit = () => {
        if (!editData.name.trim() || !editData.brand.trim() || !editData.resourceType) {
            showErrorAlert("Campos incompletos", "Debes completar todos los campos.");
            return;
        }
        onUpdate(resource.id, editData);
        setIsEditing(false);
    };

    return (
        <tr>
            {/* Nombre */}
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        disabled={loadingUpdate}
                    />
                ) : (
                    resource.name
                )}
            </td>

            {/* Marca */}
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.brand}
                        onChange={(e) => handleChange("brand", e.target.value)}
                        disabled={loadingUpdate}
                    />
                ) : (
                    resource.brand
                )}
            </td>

            {/* Tipo */}
            <td>
                {isEditing ? (
                    <select
                        value={editData.resourceType}
                        onChange={(e) => handleChange("resourceType", e.target.value)}
                        disabled={loadingUpdate}
                    >
                        <option value="Tecnologia">Tecnología</option>
                        <option value="Equipo de Sonido">Equipo de Sonido</option>
                        <option value="Material Didactico">Material Didáctico</option>
                    </select>
                ) : (
                    resource.resourceType
                )}
            </td>

            {/* Acciones */}
            <td>
                {onSelect ? (
                    <button
                        onClick={() => onSelect(resource)}
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
                        {onDelete && role === "admin" && (
                            <button
                                onClick={() => onDelete(resource.id)}
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