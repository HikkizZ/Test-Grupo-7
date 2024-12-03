import ResourceRow from "./ResourceRow";

export default function ResourceTable({
    resources,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
}) {
    // Ordenar los recursos por ID de menor a mayor
    const sortedResources = [...resources].sort((a, b) => a.id - b.id);

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
                {sortedResources.map((resource) => (
                    <ResourceRow
                        key={resource.id}
                        resource={resource}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        loadingUpdate={loadingUpdate}
                        loadingDelete={loadingDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}
