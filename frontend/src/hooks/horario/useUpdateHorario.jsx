import { useState } from "react";
import { updateHorario } from "@services/horario.service";
import { showSuccessAlert } from "../../utils/alerts";

export function useUpdateHorario(fetchHorarios) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, updatedData) => {
        try {
            setLoading(true);
            const updatedHorario = await updateHorario(id, updatedData); // Llamada al servicio para actualizar el horario
            if (updatedHorario) {
                showSuccessAlert(
                    "¡Horario actualizado!",
                    `El horario con ID ${id} ha sido actualizado correctamente.`
                );
                fetchHorarios(); // Vuelve a cargar los horarios
            }
        } catch (error) {
            console.error("Error al actualizar el horario:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}