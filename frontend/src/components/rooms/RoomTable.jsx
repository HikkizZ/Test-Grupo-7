import RoomRow from "./RoomRow";

export default function RoomTable({ rooms, onUpdate, onDelete, loadingUpdate, loadingDelete, role, onSelect }) {
    const sortedRooms = [...rooms].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tamaño (m²)</th>
                    <th>Tipo de Sala</th>
                    {role !== "Profesor" && role !== "Alumno" && <th>Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {sortedRooms.map((room) => (
                    <RoomRow
                        key={room.id}
                        room={room}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        loadingUpdate={loadingUpdate}
                        loadingDelete={loadingDelete}
                        role={role} // Pasar el rol
                        onSelect={onSelect}
                    />
                ))}
            </tbody>
        </table>
    );
}