export default function ResourceRow({ resource, onSelect, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    return (
        <tr>
            <td>{resource.name}</td>
            <td>{resource.brand}</td>
            <td>{resource.resourceType}</td>
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
                ) : (
                    <>
                        <button
                            onClick={() => onUpdate(resource.id)}
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