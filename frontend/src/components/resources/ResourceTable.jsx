import ResourceRow from "./ResourceRow";

export default function ResourceTable({ resources, onSelect, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const sortedResources = [...resources].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca/Modelo</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sortedResources.map((resource) => (
                    <ResourceRow
                        key={resource.id}
                        resource={resource}
                        onSelect={onSelect}
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