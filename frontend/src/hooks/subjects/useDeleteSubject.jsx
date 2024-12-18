import { useState } from "react";
import { deleteSubject } from "../../services/subject.service";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";

export function useDeleteSubject ({ fetchSubjects, subjects, setSubjects }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);
                await deleteSubject(id.id);
;
                const updatedSubjects = subjects.filter((subject) => subject.id !== id.id);
                setSubjects(updatedSubjects);

                showSuccessAlert('¡Eliminado!', 'La asignatura ha sido eliminada correctamente.');
                fetchSubjects();
            }
        } catch (error) {
            console.error('Error al eliminar la asignatura:', error);
            showErrorAlert('Error', 'Ocurrió un error al eliminar la asignatura.');
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}