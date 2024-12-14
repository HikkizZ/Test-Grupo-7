import { useState } from "react";
import { updateForo } from "@services/foro.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useUpdateForo(fetchForos) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, updatedData) => {
        try {
            setLoading(true);
            console.log('Actualizando foro con id:', id, 'y datos:', updatedData);
            
            // Crear un FormData si no lo es ya
            const formData = updatedData instanceof FormData ? updatedData : new FormData();
            
            // Si updatedData no es FormData, añadir cada campo al FormData
            if (!(updatedData instanceof FormData)) {
                Object.keys(updatedData).forEach(key => {
                    if (key !== 'archivos') {
                        formData.append(key, updatedData[key]);
                    }
                });
            }

            // Manejar archivos
            if (updatedData.archivos) {
                for (let i = 0; i < updatedData.archivos.length; i++) {
                    formData.append('archivos', updatedData.archivos[i]);
                }
            }

            const updatedForo = await updateForo(id, formData);
            console.log('Foro actualizado:', updatedForo);
            if (updatedForo) {
                showSuccessAlert(
                    "¡Foro modificado!",
                    `El foro con ID ${id} ha sido modificado correctamente.`
                );
                return updatedForo;
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
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}