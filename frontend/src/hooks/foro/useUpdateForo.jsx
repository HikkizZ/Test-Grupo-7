import { useState } from "react";
import { updateForo } from "@services/foro.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useUpdateForo(fetchForos) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, updatedData) => {
        try {
            setLoading(true);
            console.log('Updating foro with id:', id, 'and data:', updatedData);
            const updatedForo = await updateForo(id, updatedData);
            console.log('Updated foro:', updatedForo);
            if (updatedForo) {
                showSuccessAlert(
                    "¡Foro modificado!",
                    `El foro con ID ${id} ha sido modificado correctamente.`
                );
                // Actualizar solo el foro modificado sin alterar la posición
                fetchForos((prevForos) =>
                    prevForos.map((foro) =>
                        foro.id === id ? { ...foro, ...updatedData } : foro
                    )
                );
            } else {
                throw new Error('No se recibió respuesta del servidor al actualizar');
            }
        } catch (error) {
            console.error("Error al modificar el foro:", error);
            let errorMessage = "No se pudo actualizar el foro";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage += `: ${error.response.data.message}`;
            } else if (error.message) {
                errorMessage += `: ${error.message}`;
            }
            showErrorAlert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}
