import { useState } from "react";
import { createForo } from "../../services/foro.service";
import { showSuccessAlert } from "../../utils/alerts";

export function useCreateForo(fetchForos) {
    const [loading, setLoading] = useState(false);  // Agregar estado de carga

    const handleCreate = async (foroData) => {
        setLoading(true);  // Indicar que la creación está en progreso
        try {
            await createForo(foroData); // Llamada al servicio para crear el foro
            showSuccessAlert("Foro creado", "El foro ha sido agregado correctamente");
            fetchForos(); // Actualizar lista de foros
        } catch (error) {
            alert("Error al crear el foro: " + error.message); // Mostrar alerta en caso de error
        } finally {
            setLoading(false);  // Finalizar el estado de carga
        }
    };

    return { handleCreate, loading };  // Retornar también el estado de carga
}
