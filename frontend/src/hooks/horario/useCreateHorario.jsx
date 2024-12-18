import { useState } from "react";
import { createHorario } from "@services/horario.service";
import { showSuccessAlert } from "../../utils/alerts";
import { showErrorAlert } from "../../helpers/sweetAlert"

export function useCreateHorario(fetchHorarios) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        try {
            setLoading(true);
            await createHorario(data); // Llamada al servicio para crear el horario
            showSuccessAlert("¡Horario creado!", "El horario ha sido registrado correctamente.");
            fetchHorarios(); // Vuelve a cargar la lista de horarios
        } catch (error) {
            showErrorAlert("Error al crear el horario", error);
            //alert("Error al crear el horario: " + error);
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}
