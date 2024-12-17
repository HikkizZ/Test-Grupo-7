import { useState } from "react";
import { createSubject } from "@services/subject.service";
import { showSuccessAlert, showErrorAlert} from "@helpers/sweetAlert";

export function useCreateSubject(fetchSubjects) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (subjectData) => {
        console.log('subjectData:', subjectData);
        try {
            setLoading(true);
            const response = await createSubject(subjectData);
            if (response.message === "Asignatura creada exitosamente") {
                showSuccessAlert('¡Creado!', 'La asignatura ha sido creada exitosamente');
                fetchSubjects();
            } else {
                showErrorAlert('Error', `${response}`, `${response.details}`);
            }
        } catch (error) {
            console.error('Error al crear la asignatura: ', error.response?.data?.message || error);
            showErrorAlert('Error', error)
        } finally {
            setLoading(false);
        }        
    };

    return { handleCreate, loading };
};