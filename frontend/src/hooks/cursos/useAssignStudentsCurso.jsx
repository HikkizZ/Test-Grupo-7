import { useState } from "react";
import { assignStudents } from "@services/curso.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export function useAssignStudentsCurso(fetchCursos) {
    const [loading, setLoading] = useState(false);

    const handleAssign = async (codeCurso, studentsData) => {
        try {
            setLoading(true);
            const response = await assignStudents(codeCurso, studentsData);

            if (response?.message === "Estudiantes agregados al curso") {
                showSuccessAlert('¡Asignados!', 'Los estudiantes han sido asignados correctamente.');
                fetchCursos();
            } else {
                showErrorAlert('Error', `${response}`);
            }

        } catch (error) {
            console.error('Error al asignar estudiantes al curso:', error);
            showErrorAlert('Error', 'Ocurrió un error al asignar estudiantes al curso.');
        } finally {
            setLoading(false);
        }
    };

    return { handleAssign, loading };
}