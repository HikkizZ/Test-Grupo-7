export default function RoomRow({ room, onSelect, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    return (
        <tr>
            <td>{room.name}</td>
            <td>{room.size}</td>
            <td>{room.roomType}</td>
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
                ) : (
                    <>
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
                    </>
                )}
            </td>
        </tr>
    );
}