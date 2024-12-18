import { useState } from "react";
import { updateCalificaciones } from "../../services/calificacion.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export const useUpdateConfigCalificacion = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateConfigCalificacion = async (codeSubject, calificaciones) => {
        try {
            setLoading(true);
            const cantidad = parseInt(calificaciones);
            const response = await updateCalificaciones(codeSubject, cantidad);
            if (response?.message === "Calificaciones actualizadas") {
                showSuccessAlert('¡Actualizadas!', 'Las calificaciones han sido actualizadas correctamente.');
            } else {
                showErrorAlert('Error', `${response}`);
            }
            console.log(response);
            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            setError(err.message || "Ocurrió un error al actualizar las calificaciones");
        }
    };

    return { handleUpdateConfigCalificacion, loading, error };
}