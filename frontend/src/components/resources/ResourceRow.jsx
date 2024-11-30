export default function ResourceRow({ resource, onDelete }) {
    return (
        <tr>
            <td>{resource.id}</td>
            <td>{resource.name}</td>
            <td>
                <button onClick={() => onDelete(resource.id)}>Eliminar</button>
            </td>
        </tr>
    );
}
