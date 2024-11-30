import Swal from 'sweetalert2';

export async function deleteDataAlert() {
    return Swal.fire({
        title: '¿Estás seguro de esta operación?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
    })
}

export const showSuccessAlert = (titleMessage, message) => {
    Swal.fire(
        titleMessage,
        message,
        'success'
    );
};