import { useState } from "react";
import { createReservation } from "@services/reservation.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useCreateReservation(fetchReservations) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        try {
            setLoading(true);
            await createReservation(data);
            showSuccessAlert("Reservación creada", "La reservación ha sido creada correctamente");
            fetchReservations();
        } catch (error) {
            const errorMessage = error.message || error?.message || "Hubo un problema al crear la reservación.";
            console.error("Detalles del error:", errorMessage);

            showErrorAlert("Error al crear la reservación", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}