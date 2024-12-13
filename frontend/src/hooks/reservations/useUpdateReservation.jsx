import { useState } from "react";
import { updateReservation } from "@services/reservation.service";
import { showSuccessAlert } from "../../utils/alerts";

export function useUpdateReservation(fetchReservations) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, updatedData) => {
        try {
            setLoading(true);
            await updateReservation(id, updatedData);
            showSuccessAlert("Reservación actualizada", "La reservación ha sido actualizada correctamente");
            fetchReservations();
        } catch (error) {
            console.error("Error al actualizar la reservación:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}
