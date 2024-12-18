import { useState, useEffect } from "react";
//import { showSuccessAlert } from "../../utils/alerts";
import { showErrorAlert } from "../../helpers/sweetAlert"
import { getPeriods } from "@services/period.service"; // Servicio para obtener períodos

export default function HorarioRow({ horario, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...horario });
    const [periods, setPeriods] = useState([]); // Almacena los períodos
    
    //Carga los valores de periodo de la base de datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [periodsData] = await Promise.all([
                    getPeriods(),
                ]);
                setPeriods(periodsData || []);

            } catch (error) {
                console.error("Error al cargar datos:", error.message);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditData({ ...horario });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({ ...horario });
    };

    const handleSaveEdit = () => {
        // Extrae los valores de editData
        const { curso, teacher, classroom, subject, period, dayOfWeek } = editData;
    
        // Construye los valores formateados
        const formattedData = {
            teacherId: teacher?.rut?.trim() || "",
            subjectId: subject?.trim() || "",
            cursoId: curso?.code?.trim() || "",
            classroomId: classroom?.trim() || "",
            dayOfWeek: dayOfWeek || "",
            periodId: period?.name?.trim() || "",
        };
    
        // Validaciones de campos obligatorios
        if (!formattedData.cursoId) return showErrorAlert("El campo 'Curso' es obligatorio.");
        if (!formattedData.teacherId) return showErrorAlert("El campo 'RUT del Profesor' es obligatorio.");
        if (!formattedData.classroomId) return showErrorAlert("El campo 'Sala' es obligatorio.");
        if (!formattedData.subjectId) return showErrorAlert("El campo 'Asignatura' es obligatorio.");
        if (!formattedData.periodId) return showErrorAlert("El campo 'Periodo' es obligatorio.");
        if (!formattedData.dayOfWeek) return showErrorAlert("El campo 'Día' es obligatorio.");
    
        // Validación del formato RUT
        const rutVal = /^\d{1,2}(\.\d{3}){2}-[\dkK]$/;
        if (!rutVal.test(formattedData.teacherId)) return showErrorAlert("Rut no valido\nNo cumple formato: XX.XXX.XXX-X");
        
    
        const cursoCodeVal = /^[0-9A-Z-]+$/;
        if (!cursoCodeVal.test(formattedData.cursoId)) return showErrorAlert("El código del curso no es válido.");
        
    
        const nameVal = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nameVal.test(formattedData.subjectId)) return showErrorAlert("Asignatura no valida\nNo se permiten caracteres especiales\n@?¡-#$");
        if (!nameVal.test(formattedData.classroomId)) return showErrorAlert("Sala no valida\nNo se permiten caracteres especiales\n@?¡-#$");
        
        console.log("Cuerpo formateado para el backend:", formattedData);
    
        onUpdate(horario.id, formattedData);
        setIsEditing(false);
    };
    

    

    return (
        <tr>
            
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.curso?.code}
                        onChange={(e) => setEditData({ ...editData.curso, code: e.target.value })}
                        disabled={loadingUpdate}
                    />
                ) : (
                    `${horario.curso?.name}`
                    
                )}
            </td>
            <td>{horario.teacher.name}</td>
            <td>
                {isEditing?(
                    <input
                        type="text"
                        value={editData.teacher?.rut}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                teacher:{
                                    ...editData.teacher,rut: e.target.value
                                },
                            })
                        }
                        disabled={loadingUpdate}/>
                ):(
                    `${horario.teacher?.rut}`
                )}


            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.classroom}
                        onChange={(e) =>
                            setEditData({ ...editData, classroom: e.target.value })
                        }
                        disabled={loadingUpdate}
                    />
                ) : (
                    horario.classroom
                )}
            </td>
            <td>{isEditing ? (
                    <input
                        type="text"
                        value={editData.subject}
                        onChange={(e) =>
                            setEditData({ ...editData, subject: e.target.value })
                        }
                        disabled={loadingUpdate}
                    />
                ) : (
                    horario.subject
                )}</td>
            <td> 
                {isEditing? (
                     <select
                     value={editData.period?.name || ""} // Mostrar el nombre seleccionado
                     onChange={(e) =>
                         setEditData({
                             ...editData,
                             period: { ...editData.period, name: e.target.value },
                         })
                     }
                     disabled={loadingUpdate}
                 >
    
                     {periods.map((p) => (
                         <option key={p.id} value={p.name}> {/* El valor es el nombre */}
                             {p.name} {/* Mostrar el nombre */}
                         </option>
                     ))}
                 </select>
                ):(
                    `${horario.period?.startTime || "N/A"} - ${horario.period?.endTime || "N/A"}`
                )}
            </td>
            <td> 
                {isEditing ? (
                    <select
                        value={editData.dayOfWeek || ""}
                        onChange={(e) => setEditData({ ...editData, dayOfWeek: e.target.value })}
                    >
                        <option value="Lunes">Lunes</option>
                        <option value="Martes">Martes</option>
                        <option value="Miércoles">Miércoles</option>
                        <option value="Jueves">Jueves</option>
                        <option value="Viernes">Viernes</option>
                    </select>
                ) : (
                    horario.dayOfWeek
             )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <button onClick={handleSaveEdit} disabled={loadingUpdate}>
                            Guardar
                        </button>
                        <button onClick={handleCancelEdit} disabled={loadingUpdate}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEditClick} disabled={loadingUpdate}>
                            Modificar
                        </button>
                        <button onClick={() => onDelete(horario.id)} disabled={loadingDelete}>
                            Eliminar
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}