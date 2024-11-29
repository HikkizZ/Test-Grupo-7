import { useEffect, useState } from 'react';
import { createResource, getResources, deleteResource } from '@services/resource.service.js';
import { deleteDataAlert, showSuccessAlert } from '../utils/alerts.js';

export default function Resources() { 
    const [resources, setResources] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newResourceName, setNewResourceName] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchResources = async () => {
        try {
            const response = await getResources();
            setResources(response);
            setSearchResults(response);
        } catch (error) {
            console.error("Error: ", error);
        }
    };
    
    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                const response = await deleteResource(id);
                console.log(response);
                showSuccessAlert('¡Recurso eliminado!', 'El recurso ha sido eliminado correctamente');
                await fetchResources();
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleCreate = async () => {
        try {
            await createResource({ name: newResourceName });
            setNewResourceName("");
            setShowForm(false);
            fetchResources();
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);

        if (!query) {
            setSearchResults(resources);
            return;
        }

        let filteredResources = [];

        if (searchFilter === 'id') {
            filteredResources = resources.filter(resource =>
                resource.id.toString().includes(query)
            );
        } else if (searchFilter === 'name') {
            filteredResources = resources.filter(resource =>
                resource.name.toLowerCase().includes(query.toLowerCase())
            );
        } else {
            filteredResources = resources.filter(resource =>
                `${resource.id} ${resource.name.toLowerCase()}`.includes(query.toLowerCase())
            );
        }

        setSearchResults(filteredResources);
    };

    const resetSearch = () => {
        setSearchQuery('');
        setSearchFilter('');
        setSearchResults(resources);
    };

    useEffect(() => {
        fetchResources();
    }, []);

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Recursos</h1>
            
            <button onClick={() => setShowForm(true)}>Crear Recurso</button>
            {showForm && (
                <div>
                    <input
                        type="text"
                        value={newResourceName}
                        onChange={(e) => setNewResourceName(e.target.value)}
                        placeholder="Nombre del recurso"
                    />
                    <button onClick={handleCreate}>Guardar</button>
                </div>
            )}
            
            <br />
            <br />
            <h3>Buscar Recurso</h3>
            <div>
                <label>
                    Selecciona un filtro:
                    <select value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
                        <option value="">--Selecciona un filtro--</option>
                        <option value="id">Buscar por ID</option>
                        <option value="name">Buscar por Nombre</option>
                    </select>
                </label>
            </div>
            <br />

            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={
                        searchFilter === 'id'
                            ? 'Ingresa el ID del recurso'
                            : searchFilter === 'name'
                            ? 'Ingresa el Nombre del recurso'
                            : 'Buscar por ID y Nombre'
                    }
                />
                {searchQuery && (
                    <button onClick={resetSearch} style={{ marginLeft: '10px' }}>
                        Ver Todos los Recursos
                    </button>
                )}
            </div>

            <br />
            {searchResults.length > 0 ? (
                <div>
                    <h3>Lista de Recursos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((resource, index) => (
                                <tr key={index}>
                                    <td>{resource.id}</td>
                                    <td>{resource.name}</td>
                                    <td>
                                        <button onClick={() => handleDelete(resource.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h2>No se han encontrado resultados para tu búsqueda.</h2>
            )}
        </div>
    );
}
