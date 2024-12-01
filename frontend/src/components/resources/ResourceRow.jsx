import { useState } from "react";

export default function ResourceRow({ resource, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(resource.name);

    const handleSave = () => {
        onUpdate(resource.id, { name: newName });
        setIsEditing(false);
    };

    return (
        <tr>
            <td>{resource.id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                ) : (
                    resource.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={() => setIsEditing(false)}>Cancelar</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}>Modificar</button>
                        <button onClick={() => onDelete(resource.id)}>Eliminar</button>
                    </>
                )}
            </td>
        </tr>
    );
}
