import ResourceRow from "./ResourceRow";

export default function ResourceTable({ resources, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    // Ordenar por nombre de recurso alfabéticamente
    const sortedResources = [...resources].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Tipo de Recurso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sortedResources.map((resource) => (
                    <ResourceRow
                        key={resource.id} // Usar el ID como clave
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