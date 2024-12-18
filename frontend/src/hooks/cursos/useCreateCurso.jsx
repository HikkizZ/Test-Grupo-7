import { useState } from "react";
import { createCurso } from "@services/curso.service";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export function useCreateCurso(fetchCursos) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (cursoData) => {
        console.log('cursoData:', cursoData);
        try {
            setLoading(true);
            const response = await createCurso(cursoData);
            console.log('response:', response);

            if (response?.message === "Curso creado exitosamente") {
                showSuccessAlert('¡Creado!', 'El curso ha sido creado correctamente.');
                fetchCursos();
            } else {
                showErrorAlert('Error', `${response}`);
            }

        } catch (error) {
            console.error('Error al crear el curso:', error);
            showErrorAlert('Error', 'Ocurrió un error al crear el curso.');
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
};