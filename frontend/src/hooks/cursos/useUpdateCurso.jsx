import { useState } from "react";
import { updateCurso } from "@services/curso.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export function useUpdateCurso(fetchCursos) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, cursoData) => {
        try {
            setLoading(true);
            const updatedCurso = await updateCurso(id, cursoData);
            console.log('updatedCurso:', updatedCurso);
            
            if (updatedCurso && updatedCurso.message === "Curso actualizado exitosamente") {
                showSuccessAlert('¡Actualizado!', 'El curso ha sido actualizado correctamente.');
                fetchCursos((prevCursos) => 
                    prevCursos.map((curso) => 
                        curso.id === id ? { ...curso, ...cursoData } : curso
            )
                );
            } else {
                showErrorAlert('Error', `${updatedCurso}`);
            }
        } catch (error) {
            showErrorAlert(error.response.data.message)
            console.error('Error al actualizar el curso:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return { handleUpdate, loading };
}