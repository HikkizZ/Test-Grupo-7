import { useState, useEffect } from "react";
import { getPeriods } from "@services/period.service"; // Servicio para obtener períodos
import { getCursos } from "@services/curso.service"
import { showErrorAlert } from "../../helpers/sweetAlert"

export default function HorarioBox({ horarios }) {
    const [periods, setPeriods] = useState([]); // Almacena los períodos
    const [cursos,setCursos] = useState([]) //Almacena los curso
    const [filterType, setFilterType] = useState(""); // Tipo de filtro: "curso" o "profesor"
    const [filterValue, setFilterValue] = useState(""); // Valor seleccionado para el filtro

    // Obtine los períodos desde la base de datos
    useEffect(() => {
        const fetchPeriods = async () => {
            try {
                const periodsData = await getPeriods();
                if (Array.isArray(periodsData)) {
                    setPeriods(periodsData);
                } else {
                    showErrorAlert("Los períodos no cumplen con el formato esperado.");
                }
            } catch (error) {
                console.error("Error al cargar los períodos:", error.message);
                showErrorAlert("Error al cargar períodos", error);
            }
        };
        fetchPeriods();
    }, []);

    //Obtiene los cursos de la base de datos
    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const cursosData = await getCursos();
                if(Array.isArray(cursosData)){
                    setCursos(cursosData)
                }else{
                    showErrorAlert("Curso no cumple con el formato esperado:");
                }
            } catch (error) {
                console.error("Error al cargar los cursos", error.message);
                showErrorAlert("Error al cargar los cursos", error)
            }
        };
        fetchCursos();
    }, [])

    // Filtrar horarios en base al filtro seleccionado
    const filteredHorarios = horarios.filter((f) => {
        if (filterType === "curso" && filterValue) {
            return (
                (f.curso?.name?.toLowerCase().includes(filterValue.toLowerCase())) ||
                (f.curso?.code?.toLowerCase().includes(filterValue.toLowerCase()))
            );
        } else if (filterType === "profesor" && filterValue) {
            return (
                f.teacher?.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
                f.teacher?.rut?.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        return true;
    });
    

        const days = ["Lunes", "Martes", "Miércoles","Jueves","Viernes"];


        return(
            <div style={{ margin: "20px 0" }}>
            <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>


                <div style={{ display: "flex", gap: "30px" }}>
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
                        <input type="text"
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
                        {days.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {periods.map((period) => (
                        <tr key={period.id}>
                            <td>
                                {period.startTime} - {period.endTime}
                            </td>
                            {days.map((day) => {
                                const horario = filteredHorarios.find(
                                    (h) =>
                                        h.dayOfWeek === day &&
                                        h.period.startTime === period.startTime &&
                                        h.period.endTime === period.endTime
                                );
                                
                                return (
                                    <td key={day}>
                                       {horario ? (
                                            <div>
                                                <strong>Curso:</strong> {horario.curso?.name || "N/A"}  <br /><strong>Code:</strong> ({horario.curso?.code || "N/A"})
                                            <br />
                                                <strong>Asignatura:</strong> {horario.subject || "N/A"}
                                            <br />
                                                <strong>Profesor:</strong> {horario.teacher?.name || "N/A"}
                                            <br />
                                                <strong>Sala:</strong> {horario.classroom || "N/A"}
                                            </div>
                                            ) : null}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );  

}