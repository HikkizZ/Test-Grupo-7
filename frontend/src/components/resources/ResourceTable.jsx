import ResourceRow from "./ResourceRow";

export default function ResourceTable({ resources, onDelete, onUpdate }) {
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
                    <ResourceRow
                        key={resource.id}
                        resource={resource}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </tbody>
        </table>
    );
}
