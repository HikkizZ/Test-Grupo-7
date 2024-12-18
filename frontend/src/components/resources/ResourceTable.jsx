import ResourceRow from "./ResourceRow";
import "../../styles/around.css";
import "../../styles/around.css";


export default function ResourceTable({
    resources,
    onSelect,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
    role,
}) {
    const sortedResources = [...resources].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="around-table-container">
            <table className="around-table">
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
                            role={role}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}