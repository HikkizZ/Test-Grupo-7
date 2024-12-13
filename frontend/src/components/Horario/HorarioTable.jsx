import HorarioRow from "./HorarioRow";

export default function HorarioTable({
    horarios,
    onUpdate,
    onDelete,
    loadingUpdate,
    loadingDelete,
}) {
    const sortedHorarios = [...horarios].sort((a, b) => a.id - b.id);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Curso</th>
                    <th>Profesor</th>
                    <th>RUT</th>
                    <th>Sala</th>
                    <th>Asignatura</th>
                    <th>Periodo</th>
                    <th>Día</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sortedHorarios.map((horario) => (
                    <HorarioRow
                        key={horario.id}
                        horario={horario}
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
