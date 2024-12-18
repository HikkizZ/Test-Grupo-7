import { useState } from "react";

import { assignGradesStudents } from "@services/calificacion.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export function useAssignCalificaciones(fetchCalificaciones) {
    const [loading, setLoading] = useState(false);

    const handleAssign = async (calificacionesData) => {
        try {
            setLoading(true);
            const response = await assignGradesStudents(calificacionesData);

            if (response?.message === "Calificaciones asignadas correctamente") {
                showSuccessAlert('¡Asignadas!', 'Las calificaciones han sido asignadas correctamente.');
                fetchCalificaciones();
            } else {
                showErrorAlert('Error', `${response}`);
            }

        } catch (error) {
            console.error('Error al asignar calificaciones:', error);
            showErrorAlert('Error', 'Ocurrió un error al asignar calificaciones.');
        } finally {
            setLoading(false);
        }
    };

    return { handleAssign, loading };
}