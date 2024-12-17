export default function RoomRow({ room, onUpdate, onDelete, loadingUpdate, loadingDelete, role }) {
    return (
        <tr>
            <td>{room.name}</td>
            <td>{room.size}</td>
            <td>{room.roomType}</td>
            {role !== "Profesor" && role !== "Alumno" && (
                <td>
                    {onUpdate && (
                        <button
                            onClick={() => onUpdate(room.id)}
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
                </td>
            )}
        </tr>
    );
}