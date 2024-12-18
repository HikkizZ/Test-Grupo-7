import NotasRow from "./NotasRow";

export default function NotasTable({ notas, onCalificar }) {
    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>Rut</th>
                    <th>Nombre</th>
                    <th>Asignatura</th>
                    <th>Código</th>
                    <th>Nombre Calificación</th>
                    <th>Nota</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {notas.length > 0 ? (
                    notas.map((nota) => (
                        <NotasRow
                            key={nota.id}
                            notas={nota}
                            onCalificar={onCalificar}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No hay notas registradas</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
