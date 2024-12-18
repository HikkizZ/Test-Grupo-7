import ResourceRow from "./ResourceRow";

export default function ResourceTable({
    resources,
    onSelect,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
    role, // Agregar rol del usuario
}) {
    const sortedResources = [...resources].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca/Modelo</th>
                    <th>Tipo</th>
                    {role !== "Profesor" && role !== "Alumno" && <th>Acciones</th>}
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
                        role={role} // Pasar rol del usuario
                    />
                ))}
            </tbody>
        </table>
    );
}