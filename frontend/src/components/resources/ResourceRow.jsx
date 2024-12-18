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
        if (!editData.name.trim() || !editData.brand.trim() || !editData.resourceType) {
            showErrorAlert("Campos incompletos", "Debes completar todos los campos.");
            return;
        }

        onUpdate(resource.id, editData);
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
                        className="modal-input"
                    />
                ) : (
                    resource.name
                )}
            </td>

            {/* Columna Marca */}
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.brand}
                        onChange={(e) => handleChange("brand", e.target.value)}
                        disabled={loadingUpdate}
                        placeholder="Marca"
                        className="modal-input"
                    />
                ) : (
                    resource.brand
                )}
            </td>

            {/* Columna Tipo */}
            <td>
                {isEditing ? (
                    <select
                        value={editData.resourceType}
                        onChange={(e) => handleChange("resourceType", e.target.value)}
                        disabled={loadingUpdate}
                        className="modal-input"
                    >
                        <option value="Tecnologia">Tecnología</option>
                        <option value="Equipo de Sonido">Equipo de Sonido</option>
                        <option value="Material Didactico">Material Didáctico</option>
                    </select>
                ) : (
                    resource.resourceType
                )}
            </td>

            {/* Columna Acciones */}
            <td>
                {onSelect ? (
                    <button
                        onClick={() => onSelect(resource)}
                        className="btn btn-success"
                    >
                        Seleccionar
                    </button>
                ) : isEditing ? (
                    <>
                        <button
                            onClick={handleSaveEdit}
                            disabled={loadingUpdate}
                            className="btn btn-primary"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            disabled={loadingUpdate}
                            className="btn btn-danger"
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
                                className="btn btn-warning"
                            >
                                Modificar
                            </button>
                        )}
                        {onDelete && role === "admin" && (
                            <button
                                onClick={() => onDelete(resource.id)}
                                disabled={loadingDelete}
                                className="btn btn-danger"
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