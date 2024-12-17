import { useState } from "react";
import { assignSubjects } from "@services/curso.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export function useAssignSubjectsStudentCurso(fetchCursos) {
    const [loadingSubjects, setLoadingSubjects] = useState(false);

    const handleAssignSubjects = async (codeCurso) => {
        console.log('codeCurso:', codeCurso);
        try {
            setLoadingSubjects(true);
            const response = await assignSubjects(codeCurso);
            console.log('response:', response);

            if (response?.message === "Asignaturas asignadas a los estudiantes") {
                showSuccessAlert('¡Asignadas!', 'Las materias han sido asignadas correctamente.');
                fetchCursos();
            } else {
                showErrorAlert('Error', `${response}`);
            }

        } catch (error) {
            console.error('Error al asignar materias al estudiante:', error);
            showErrorAlert('Error', 'Ocurrió un error al asignar materias al estudiante.');
        } finally {
            setLoadingSubjects(false);
        }
    };

    return { handleAssignSubjects, loadingSubjects };
}