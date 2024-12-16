import RoomRow from "./RoomRow";

export default function RoomTable({ rooms, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const sortedRooms = [...rooms].sort((a, b) => a.id - b.id);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
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