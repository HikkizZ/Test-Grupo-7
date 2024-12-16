import RoomRow from "./RoomRow";

export default function RoomTable({ rooms, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    // Ordenar por nombre de sala alfabéticamente
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
                        key={room.name} // Usar el nombre como clave 
                        room={room}
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