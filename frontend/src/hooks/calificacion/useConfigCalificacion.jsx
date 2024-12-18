import { useState } from "react";
import { configCalificaciones } from "../../services/calificacion.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export const useConfigCalificacion = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleConfigCalificacion = async (data) => {
        console.log(data);
        try {
            setLoading(true);
            const response = await configCalificaciones(data);
            if (response?.message === "Calificaciones configuradas") {
                showSuccessAlert('¡Configuradas!', 'Las calificaciones han sido configuradas correctamente.');
            } else {
                showErrorAlert('Error', `${response}`);
            }
            console.log(response);
            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            setError(err.message || "Ocurrió un error al configurar las calificaciones");
        }
    };

    return { handleConfigCalificacion, loading, error };
}