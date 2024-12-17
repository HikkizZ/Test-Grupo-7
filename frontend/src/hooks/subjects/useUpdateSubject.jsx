import { useState } from "react";
import { updateSubject } from "@services/subject.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export function useUpdateSubject(fetchSubjects) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, subjectData) => {
        try {
            setLoading(true);
            const updatedSubject = await updateSubject(id, subjectData);
            
            if (updatedSubject === "Asignatura actualizada exitosamente") {
                showSuccessAlert('¡Actualizado!', 'La asignatura ha sido actualizado correctamente.');
                fetchSubjects((prevSubjects) => 
                    prevSubjects.map((subject) => 
                        subject.id === id ? { ...subject, ...subjectData } : subject
            )
                );
                fetchSubjects();
            } else {
                showErrorAlert('Error', `${updatedSubject}`);
            }
        } catch (error) {
            showErrorAlert(error.response.data.message)
            console.error('Error al actualizar la asugnatura:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return { handleUpdate, loading };
}