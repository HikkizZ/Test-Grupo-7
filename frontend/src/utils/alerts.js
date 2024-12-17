import Swal from "sweetalert2";

// Alertas de éxito
export const showSuccessAlert = (title, text) => {
    Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonText: "Aceptar",
    });
};

// Alertas de error
export const showErrorAlert = (title, text) => {
    Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonText: "Aceptar",
    });
};

// Alertas de confirmación
export const deleteDataAlert = () => {
    return Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás deshacer esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    });
};
