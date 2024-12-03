import { useState } from "react";
import { getForos } from "../../services/foro.service";

export function useGetForos() {
    const [foros, setForos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchForos = async () => {
        setLoading(true);
        try {
            const response = await getForos();
            console.log('Respuesta de getForos:', response); // Añadir este log para ver la respuesta
            
            if (response && Array.isArray(response)) {
                setForos(response); // Almacenar los foros
            } else {
                console.error("Datos inválidos recibidos de la API", response);
            }
        } catch (error) {
            console.error("Error al obtener foros", error);
        } finally {
            setLoading(false);
        }
    };
    

    return { foros, fetchForos, loading };
}

