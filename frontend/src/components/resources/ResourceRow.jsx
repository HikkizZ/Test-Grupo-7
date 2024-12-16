import { useState } from "react";

export default function ResourceRow({ resource, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: resource.name,
        brand: resource.brand,
        resourceType: resource.resourceType,
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
            name: resource.name,
            brand: resource.brand,
            resourceType: resource.resourceType,
        });
    };

    const handleSaveEdit = () => {
        onUpdate(resource.id, editData);
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
                    resource.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.brand}
                        onChange={(e) => handleChange("brand", e.target.value)}
                        disabled={loadingUpdate}
                        placeholder="Marca"
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                ) : (
                    resource.brand
                )}
            </td>
            <td>
                {isEditing ? (
                    <select
                        value={editData.resourceType}
                        onChange={(e) => handleChange("resourceType", e.target.value)}
                        disabled={loadingUpdate}
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        <option value="Tecnologia">Tecnología</option>
                        <option value="Equipo de Sonido">Equipo de Sonido</option>
                        <option value="Material Didactico">Material Didáctico</option>
                    </select>
                ) : (
                    resource.resourceType
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
                    </>
                )}
            </td>
        </tr>
    );
}