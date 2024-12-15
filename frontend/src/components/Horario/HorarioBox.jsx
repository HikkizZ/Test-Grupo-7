import { useState, useEffect } from "react";
import { getPeriods } from "@services/period.service"; // Servicio para obtener períodos

export default function HorarioBox({ horarios }) {
    const [horarioMatrix, setHorarioMatrix] = useState([]);
    const [periods, setPeriods] = useState([]); // Almacenar los períodos
    const [filterType, setFilterType] = useState(""); // Tipo de filtro: "curso" o "profesor"
    const [filterValue, setFilterValue] = useState(""); // Valor seleccionado para el filtro

    // Obtener los períodos desde la base de datos
    useEffect(() => {
        const fetchPeriods = async () => {
            try {
                const periodsData = await getPeriods(); // Llama al servicio para obtener los períodos
                if (Array.isArray(periodsData)) {
                    setPeriods(periodsData); // Almacena los períodos en el estado si son válidos
                } else {
                    console.warn("Estructura de datos inesperada para períodos:", periodsData);
                }
            } catch (error) {
                console.error("Error al cargar los períodos:", error.message);
            }
        };

        fetchPeriods(); // Llama al servicio al montar el componente
    }, []);

    // Filtrar horarios en base al filtro seleccionado
    const filteredHorarios = horarios.filter((h) => {
        if (filterType === "curso" && filterValue) {
            return h.curso.toLowerCase().includes(filterValue.toLowerCase());
        } else if (filterType === "profesor" && filterValue) {
            return h.teacher.name.toLowerCase().includes(filterValue.toLowerCase());
        }
        return true; // Si no hay filtro, retorna todos los horarios
    });

    // Construir la matriz del horario dinámicamente
    useEffect(() => {
        if (periods.length > 0) {
            const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

            const matrix = periods.map((period) => {
                const hourRange = `${period.startTime} - ${period.endTime}`; // Rango de horas del período
                const row = { hour: hourRange }; // Crear la fila para cada período

                days.forEach((day) => {
                    const horario = filteredHorarios.find(
                        (h) =>
                            h.dayOfWeek === day &&
                            `${h.period.startTime} - ${h.period.endTime}` === hourRange
                    );
                    row[day] = horario
                        ? `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                               <strong>Curso: ${horario.curso}</strong> 
                               <span>Asignatura: ${horario.subject}</span>
                               <em>Profesor: ${horario.teacher.name} <br/>Rut: ${horario.teacher.rut}</em>
                               <span>Sala: ${horario.classroom}</span>
                           </div>`
                        : ""; // Si no hay horario para este día/período, deja vacío
                });

                return row;
            });

            setHorarioMatrix(matrix); // Actualiza la matriz del horario
        }
    }, [filteredHorarios, periods]);

    return (
        <div style={{ margin: "20px 0" }}>
            <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                Vista de Horario
                {/* Select para seleccionar filtro */}
                <div style={{ display: "flex", gap: "10px" }}>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ height: "38px", borderRadius: "5px", padding: "5px" }}
                    >
                        <option value="">-- Filtrar por --</option>
                        <option value="curso">Curso</option>
                        <option value="profesor">Profesor</option>
                    </select>
                    {filterType && (
                        <input
                            type="text"
                            placeholder={`Buscar ${filterType}`}
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            style={{ height: "38px", borderRadius: "5px", padding: "5px" }}
                        />
                    )}
                </div>
            </h2>

            <table
                border="1"
                style={{
                    width: "100%",
                    textAlign: "center",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th>Horas/Días</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                    </tr>
                </thead>
                <tbody>
                    {horarioMatrix.map((row, index) => (
                        <tr key={index}>
                            <td>{row.hour}</td>
                            <td dangerouslySetInnerHTML={{ __html: row.Lunes }} />
                            <td dangerouslySetInnerHTML={{ __html: row.Martes }} />
                            <td dangerouslySetInnerHTML={{ __html: row.Miércoles }} />
                            <td dangerouslySetInnerHTML={{ __html: row.Jueves }} />
                            <td dangerouslySetInnerHTML={{ __html: row.Viernes }} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
