import { useState, useEffect } from "react";
import { getPeriods } from "@services/period.service"; // Servicio para obtener períodos
import { getCursos } from "@services/curso.service"; // Servicio para obtener cursos
import { getRooms } from "@services/room.service"; // Servicio para obtener Salas
import { getSubjects } from "@services/subject.service"; // Servicio para obtener Asignaturas
import { getUsers } from "@services/user.service"
import { showErrorAlert } from "../../helpers/sweetAlert"

export default function HorarioForm({ onCreate, loading }) {
    const [showForm, setShowForm] = useState(false);
    const [horarioData, setHorarioData] = useState({
        cursoId: "",
        teacherId: "",
        classroomId: "",
        subjectId: "",
        periodId: "",
        dayOfWeek: "",
    });
    const [teachers, setTeachers] = useState ([]);
    const [periods, setPeriods] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Carga los valores que se encuentran en la base de datos
        const fetchData = async () => {
            try {
                const [teachersData, periodsData, cursosData, roomsData, subjectsData] = await Promise.all([
                    getUsers(),
                    getPeriods(),
                    getCursos(),
                    getRooms(),
                    getSubjects(),
                ]);
                setTeachers(teachersData || []);
                setPeriods(periodsData || []);
                setCursos(cursosData || []);
                setRooms(roomsData || []);
                setSubjects(subjectsData || []);
            } catch (error) {
                console.error("Error al cargar datos:", error.message);
            }
        };

        fetchData();
    }, []);

    const handleCancel = () => {
        setShowForm(false); // Solo oculta el formulario, no reinicia `horarioData`
    };
    
    const handleSubmit = () => {
        const { cursoId, teacherId, classroomId, subjectId, periodId, dayOfWeek } = horarioData;

        //Verifica que todos los campos hayan sido llenados 
        if (!cursoId) return showErrorAlert("El campo 'Curso' es obligatorio.");
        if (!teacherId) return showErrorAlert("El campo 'Rut del Profesor' es obligatorio.");
        if (!classroomId) return showErrorAlert("El campo 'Sala' es obligatorio.");
        if (!subjectId) return showErrorAlert("El campo 'Asignatura' es obligatorio.");
        if (!periodId) return showErrorAlert("El campo 'Periodo' es obligatorio.");
        if (!dayOfWeek) return showErrorAlert("El campo 'Día' es obligatorio.");

        //Verifica las validaciones de todos los componentes
        const rutVal = /^\d{1,2}(\.\d{3}){2}-[\dkK]$/;
        if(!rutVal.test(teacherId)) return showErrorAlert("Rut no valido\nNo cumple formato: XX.XXX.XXX-X");
        
        const cursoCodeVal= /^[0-9A-Z-]+$/;
        if(!cursoCodeVal.test(cursoId)) return showErrorAlert("Code del curso no valido");

        const subjectVal = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
        if(!subjectVal.test(subjectId)) return showErrorAlert("Asignatura no valida\nNo se permiten caracteres especiales\n@?¡-#$");
        
        const roomVal = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
        if(!roomVal.test(classroomId)) return showErrorAlert("Sala no valida\nNo se permiten caracteres especiales\n@?¡-#$");

        const rutExist = teachers.some((teacher) => teacher.rut === teacherId);
        if (!rutExist) return showErrorAlert("El rut ingresado no es encontrado");

        const cursoExist = cursos.some((curso) => curso.code === cursoId);
        if (!cursoExist) return showErrorAlert("El Code del Curso ingresado no es encontrado");

        const roomExist = rooms.some((room) => room.name === classroomId);
        if (!roomExist) return showErrorAlert("Sala no encontrada ");

        const subjectExist = subjects.some((subject) => subject.name === subjectId);
        if (!subjectExist) return showErrorAlert("Asignatura no encontrada");

        onCreate(horarioData);
        setShowForm(false); // Cierra el formulario después de enviar los datos
    };

    /*const formatRUT = (value) => {
        const cleaned = value.replace(/[^0-9kK]/g, "");
        if (cleaned.length <= 1) return cleaned;

        const verifier = cleaned.slice(-1);
        const number = cleaned.slice(0, -1);

        return number
            .split("")
            .reverse()
            .reduce((acc, digit, index) => (index % 3 === 0 ? `${digit}.${acc}` : `${digit}${acc}`), "")
            .slice(0, -1) + `-${verifier}`;
    };

    const handleRUTChange = (e) => {
        const formatted = formatRUT(e.target.value);
        setHorarioData({ ...horarioData, teacherId: formatted });
    };*/

    return (
        <div>
            {!showForm ? (
                <button onClick={() => setShowForm(true)}>Crear Horario</button>
            ) : (
                <div>
                    <div>
                    {/* Campo de Curso */}
                    <input
                        type="text"
                        list="cursos"
                        value={horarioData.cursoId}
                        onChange={(e) => setHorarioData({ ...horarioData, cursoId: e.target.value })}
                        placeholder="Code de Curso"
                        disabled={loading}
                    />
                    <datalist id="cursos">
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.code} />
                        ))}
                    </datalist>
                    </div>
                    {/* Campo de RUT */}
                    <div>
                        <input
                            type="text"
                            value={horarioData.teacherId}
                            /*onChange={handleRUTChange}*/
                            onChange={(e) => setHorarioData({ ...horarioData, teacherId: e.target.value })}
                            placeholder="Rut del Profesor"
                            disabled={loading}
                        />
                    </div>

                    {/* Campo de Sala */}
                    <div>
                        <input
                            type="text"
                            value={horarioData.classroomId}
                            onChange={(e) =>
                                setHorarioData({ ...horarioData, classroomId: e.target.value })
                            }
                            placeholder="Sala"
                            disabled={loading}
                            list="rooms"
                        />
                        <datalist id="rooms">
                            {rooms.map((room) => (
                                <option key={room.id} value={room.name}>
                                    {room.name}
                                </option>
                            ))}
                        </datalist>
                    </div>

                    {/* Campo de Asignatura */}
                    <div>
                        <input
                            type="text"
                            value={horarioData.subjectId}
                            onChange={(e) =>
                                setHorarioData({ ...horarioData, subjectId: e.target.value })
                            }
                            placeholder="Asignatura"
                            disabled={loading}
                            list="subjects"
                        />
                        <datalist id="subjects">
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.name}>
                                    {subject.name}
                                </option>
                            ))}
                        </datalist>
                    </div>

                    {/* Campo de Período */}
                    <div>
                        <select
                            value={horarioData.periodId}
                            onChange={(e) =>
                                setHorarioData({ ...horarioData, periodId: e.target.value })
                            }
                            disabled={loading}
                        >
                            <option value="">Selecciona un período</option>
                            {periods.map((period) => (
                                <option key={period.id} value={period.name}>
                                    {period.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo de Día */}
                    <div>
                        <select
                            value={horarioData.dayOfWeek}
                            onChange={(e) =>
                                setHorarioData({ ...horarioData, dayOfWeek: e.target.value })
                            }
                            disabled={loading}
                        >
                            <option value="">Selecciona un día</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miércoles">Miércoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                        </select>
                    </div>

                    {/* Botones */}
                    <div>
                        <button onClick={handleSubmit} disabled={loading}>
                            Guardar
                        </button>
                        <button onClick={handleCancel} disabled={loading}>
                            Cancelar
                        </button>
                    </div>
                </div>
                
            )}
        </div>
    );
}
