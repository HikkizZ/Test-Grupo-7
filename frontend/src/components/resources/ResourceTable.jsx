import ResourceRow from "./ResourceRow";

export default function ResourceTable({ resources, onDelete, loadingDelete, onUpdate, loadingUpdate }) {
    // Ordenar los recursos por ID
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
                        onDelete={onDelete}
                        loadingDelete={loadingDelete}
                        onUpdate={onUpdate}
                        loadingUpdate={loadingUpdate}
                    />
                ))}
            </tbody>
        </table>
    );
}

