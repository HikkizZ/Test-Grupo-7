import { useState } from "react";
import { editNameCalificacion } from "../../services/calificacion.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export const useEditNameCalificacion = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEditNameCalificacion = async (data) => {   
        const { idCalificacion, newName } = data; 
        try {
            setLoading(true);
            const response = await editNameCalificacion(idCalificacion, newName);
            if (response?.message === "Nombre de calificación actualizado") {
                showSuccessAlert('¡Actualizado!', 'El nombre de la calificación ha sido actualizado correctamente.');
            } else {
                showErrorAlert('Error', `${response}`);
            }
            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            setError(err.message || "Ocurrió un error al actualizar el nombre de la calificación");
        }
    };

    return { handleEditNameCalificacion, loading, error };
}