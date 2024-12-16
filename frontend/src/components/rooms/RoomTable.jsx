import RoomRow from "./RoomRow";

export default function RoomTable({ rooms, onSelect, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    // Ordenar las salas alfabéticamente por nombre
    const sortedRooms = [...rooms].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tamaño (m²)</th>
                    <th>Tipo de Sala</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sortedRooms.map((room) => (
                    <RoomRow
                        key={room.id}
                        room={room}
                        onSelect={onSelect} // Nueva función de selección
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