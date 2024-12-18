import { useState } from 'react';

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    },
    title: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '20px',
    },
    searchForm: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '20px',
    },
    input: {
        padding: '12px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        flex: '1 1 200px',
    },
    select: {
        padding: '12px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: 'white',
        flex: '1 1 200px',
    },
    button: {
        padding: '12px 15px',
        fontSize: '14px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        backgroundColor: '#dc3545',
        color: 'white',
    },
    loadingText: {
        color: '#666',
        fontStyle: 'italic',
    },
};

export default function SubjectSearch({ onFilterUpdate, onReset, loading }) {
    const [areFiltersActive, setAreFiltersActive] = useState(false);

    const [filters, setFilters] = useState({
        name: '',
        code: '',
        curso: '',
        profesor: '',
    });

    const handleFilterChange = (filter, value) => {
        const updatedFilters = { ...filters, [filter]: value };
        setFilters(updatedFilters);
        onFilterUpdate(updatedFilters);

        const hasActiveFilters = Object.values(updatedFilters).some((value) => value !== '');
        setAreFiltersActive(hasActiveFilters);
    };

    const handleResetFilters = () => {
        setFilters({
            name: '',
            code: '',
            curso: '',
            profesor: '',
        });
        setAreFiltersActive(false);
        onReset();
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Buscar Asignatura</h3>
            <div style={styles.searchForm}>
                <input
                    type='text'
                    placeholder='Buscar por nombre'
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    style={styles.input}
                />

                <input
                    type='text'
                    placeholder='Buscar por código'
                    value={filters.code}
                    onChange={(e) => handleFilterChange('code', e.target.value)}
                    style={styles.input}
                />

                <input
                    type='text'
                    placeholder='Buscar por curso'
                    value={filters.curso}
                    onChange={(e) => handleFilterChange('curso', e.target.value)}
                    style={styles.input}
                />

                {areFiltersActive && (
                    <button
                        onClick={handleResetFilters}
                        disabled={loading}
                        style={styles.button}
                    >
                        Limpiar Filtros
                    </button>
                )}
            </div>
            {loading && <p style={styles.loadingText}>Cargando...</p>}
        </div>
    )
}

