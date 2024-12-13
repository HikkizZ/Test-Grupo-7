import { useState } from "react";
import { deleteHorario } from "@services/horario.service";
import { deleteDataAlert, showSuccessAlert } from "../../utils/alerts";

export function useDeleteHorario({ setHorarios, setSearchResults }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);

                await deleteHorario(id); // Llamada al servicio para eliminar el horario

                // Actualizar la lista de horarios
                setHorarios((prevHorarios) =>
                    prevHorarios.filter((horario) => horario.id !== id)
                );

                // Actualizar los resultados de búsqueda
                setSearchResults((prevResults) =>
                    prevResults.filter((horario) => horario.id !== id)
                );

                showSuccessAlert("¡Horario eliminado!", "El horario ha sido eliminado con éxito.");
            }
        } catch (error) {
            alert("Error al eliminar el horario: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}
