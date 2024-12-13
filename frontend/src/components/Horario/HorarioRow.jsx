import { useState } from "react";

export default function HorarioRow({ horario, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...horario });

    const handleEditClick = () => {
        setIsEditing(true);
        setEditData({ ...horario });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({ ...horario });
    };

    const handleSaveEdit = () => {
        onUpdate(horario.id, editData);
        setIsEditing(false);
    };

    return (
        <tr>
            <td>{horario.id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.curso}
                        onChange={(e) => setEditData({ ...editData, curso: e.target.value })}
                        disabled={loadingUpdate}
                    />
                ) : (
                    horario.curso
                )}
            </td>
            <td>{isEditing ? (
                    <input
                        type="text"
                        value={editData.teacher}
                        onChange={(e) => setEditData({ ...editData, teacher: e.target.value })}
                        disabled={loadingUpdate}
                    />
                ) : (
                    horario.teacher.name
                )}
            </td>
            <td>{horario.teacher.rut}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.classroom}
                        onChange={(e) =>
                            setEditData({ ...editData, classroom: e.target.value })
                        }
                        disabled={loadingUpdate}
                    />
                ) : (
                    horario.classroom
                )}
            </td>
            <td>{horario.subject}</td>
            <td>
                {horario.period.startTime} - {horario.period.endTime}
            </td>
            <td>{horario.dayOfWeek}</td>
            <td>
                {isEditing ? (
                    <>
                        <button onClick={handleSaveEdit} disabled={loadingUpdate}>
                            Guardar
                        </button>
                        <button onClick={handleCancelEdit} disabled={loadingUpdate}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEditClick} disabled={loadingUpdate}>
                            Modificar
                        </button>
                        <button onClick={() => onDelete(horario.id)} disabled={loadingDelete}>
                            Eliminar
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}