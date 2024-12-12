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
            showErrorAlert(
                "Error al crear la reservación",
                error.response?.data?.message || "Hubo un problema al crear la reservación."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}
