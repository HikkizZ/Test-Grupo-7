import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importamos SweetAlert

export function useSearchResource(resources) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState(resources || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (value) => {
        if (searchFilter === "id" && value && !/^\d*$/.test(value)) {
            // Mostrar alerta si no es un número
            Swal.fire({
                icon: "error",
                title: "Error de entrada",
                text: "El ID debe contener solo números.",
                confirmButtonText: "Aceptar",
            });
            return; // Evitar que se actualice el estado si no es un número
        }

        setSearchQuery(value); // Actualizar el estado si es válido
    };

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                let filteredResults = [];

                if (!searchQuery) {
                    // Si no hay query, mostramos todos los recursos
                    filteredResults = resources;
                } else {
                    if (searchFilter === "id") {
                        filteredResults = resources.filter((resource) =>
                            resource.id.toString().includes(searchQuery)
                        );
                    } else if (searchFilter === "name") {
                        filteredResults = resources.filter((resource) =>
                            resource.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    } else {
                        // Buscar por ambos (ID y Nombre)
                        filteredResults = resources.filter((resource) =>
                            `${resource.id} ${resource.name.toLowerCase()}`.includes(searchQuery.toLowerCase())
                        );
                    }
                }

                setSearchResults(filteredResults);
            } catch (err) {
                console.error("Error en búsqueda automática:", err);
                setError("Error al buscar recursos.");
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [searchQuery, searchFilter, resources]);

    return {
        searchQuery,
        setSearchQuery: handleInputChange, // Usamos nuestra función personalizada
        searchFilter,
        setSearchFilter,
        searchResults,
        loading,
        error,
    };
}
