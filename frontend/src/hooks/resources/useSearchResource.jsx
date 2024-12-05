import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function useSearchResource(resources) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState(resources || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Ejecutar búsqueda automáticamente cuando searchQuery o searchFilter cambian
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
                        if (isNaN(searchQuery)) {
                            Swal.fire({
                                icon: "error",
                                title: "Error de búsqueda",
                                text: "El ID debe contener solo números.",
                            });
                            return;
                        }

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
    }, [searchQuery, searchFilter, resources]); // Se ejecuta cuando cambian searchQuery, searchFilter o resources

    // Validar entrada para ID
    const handleQueryChange = (query) => {
        if (searchFilter === "id") {
            if (!/^\d*$/.test(query)) {
                Swal.fire({
                    icon: "error",
                    title: "Error de búsqueda",
                    text: "El ID debe contener solo números.",
                });
                return; // Evitar cambios en el query
            }
        }
        setSearchQuery(query); // Actualizar query solo si es válido
    };

    // Resetear búsqueda
    const resetSearch = () => {
        setSearchQuery("");
        setSearchResults(resources);
        setSearchFilter("");
    };

    return {
        searchQuery,
        setSearchQuery: handleQueryChange, // Usamos la validación aquí
        searchFilter,
        setSearchFilter,
        searchResults,
        resetSearch, // Agregamos esta función para el botón
        loading,
        error,
    };
}
