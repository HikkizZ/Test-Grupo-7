import { useState, useEffect } from "react";
//import { showSuccessAlert } from "../../utils/alerts";
import { showErrorAlert } from "../../helpers/sweetAlert"
import { getPeriods } from "@services/period.service"; // Servicio para obtener períodos

export default function HorarioRow({ horario, onUpdate, onDelete, loadingUpdate, loadingDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...horario });
    const [periods, setPeriods] = useState([]); // Almacena los períodos
    
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

    const handleEditClick = () => {
        setIsEditing(true);
        setEditData({ ...horario });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({ ...horario });
    };

    const handleSaveEdit = () => {
        const formattedData = {
            teacherId: editData.teacher?.rut, // Enviar solo el RUT del profesor
            subjectId: editData.subject, // El nombre de la asignatura
            cursoId: editData.curso?.code, // Solo el código del curso
            classroomId: editData.classroom, // El nombre de la sala
            dayOfWeek: editData.dayOfWeek, // Día seleccionado
            periodId: editData.period?.name || "", // Nombre del período
        };
        console.log("Valor de periodId:", editData.period?.name);
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