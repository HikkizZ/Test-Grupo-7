import RoomRow from "./RoomRow";
import "../../styles/around.css"; 
import "../../styles/around.css"; 

export default function RoomTable({
    rooms,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
    role,
    onSelect,
}) {
    const sortedRooms = [...rooms].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="around-table-container">
            <table className="around-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Capacidad de Alumnos</th>
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
                            role={role}
                            onSelect={onSelect}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}