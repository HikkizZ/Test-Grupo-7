import { useState } from 'react';
import { useGetResource } from '../hooks/resources/useGetResource';

export default function SearchResource() {
    const { resource, loading, error, fetchResource } = useGetResource();
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        fetchResource({ id: id.trim() || undefined, name: name.trim() || undefined }); // Pasamos los parámetros no vacíos
    };

    return (
        <div>
            <h2>Buscar Recurso</h2>
            <form onSubmit={handleSearch}>
                <label>
                    ID:
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="ID del recurso"
                    />
                </label>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre del recurso"
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {resource && (
                <div>
                    <h3>Resultado</h3>
                    <pre>{JSON.stringify(resource, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
