import { useState } from "react";
import { calificarAlumno } from "../../services/calificacion.service";
import { showSuccessAlert, showErrorAlert } from "../../helpers/sweetAlert";

export function useCalificar(fetchNotas) {
    const [loading, setLoading] = useState(false);

    const handleCalificar = async (calificacionData) => {
        console.log('calificacionData:', calificacionData);

        try {
            setLoading(true);
            const calificacion = await calificarAlumno(calificacionData);
            console.log('calificacion:', calificacion);

            if (calificacion && calificacion.message === "Nota asignada exitosamente") {
                showSuccessAlert('¡Calificado!', 'La calificación ha sido registrada correctamente.');
                fetchNotas((prevNotas) => [...prevNotas, calificacionData]);
            } else {
                showErrorAlert('Error', `${calificacion}`);
            }
        } catch (error) {
            showErrorAlert(error.response.data.message)
            console.error('Error al calificar el alumno:', error);
        } finally {
            setLoading(false);
        }
    }

    return { handleCalificar, loading };
}