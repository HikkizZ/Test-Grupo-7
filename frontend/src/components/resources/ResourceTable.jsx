import ResourceRow from "./ResourceRow";

export default function ResourceTable({ resources, onDelete, loading }) {
    if (loading) return <p>Cargando recursos...</p>;

    if (!resources || resources.length === 0) {
        return <h2>No se han encontrado recursos.</h2>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {resources.map((resource) => (
                    <ResourceRow key={resource.id} resource={resource} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
}
