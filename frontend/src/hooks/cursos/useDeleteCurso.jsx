import { useState } from "react";
import { deleteCurso } from "../../services/curso.service";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";

export function useDeleteCurso ({ fetchCursos, cursos, setCursos }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        console.log('id:', id.code);
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);
                await deleteCurso(id);

                const updatedCursos = cursos.filter((curso) => curso.id !== id);
                setCursos(updatedCursos);
                
                showSuccessAlert('¡Eliminado!', 'El curso ha sido eliminado correctamente.');
                fetchCursos();
            }
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
            showErrorAlert('Error', 'Ocurrió un error al eliminar el curso.');
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
};