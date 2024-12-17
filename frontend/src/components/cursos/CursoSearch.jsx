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

export default function CursoSearch({ onFilterUpdate, onReset, loading }) {
    const [areFiltersActive, setAreFiltersActive] = useState(false);

    const [filters, setFilters] = useState({
        name: '',
        level: '',
        year: '',
        code: ''
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
            level: '',
            year: '',
            code: ''
        });
        setAreFiltersActive(false);
        onReset();
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Buscar Curso</h3>
            <div style={styles.searchForm}>
                <input
                    type='text'
                    placeholder='Buscar por nombre'
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    style={styles.input}
                />

                <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    style={styles.select}
                >
                    <option value=''>Nivel</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </select>

                <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    style={styles.select}
                >
                    <option value=''>Año</option>
                    <option value='2022'>2022</option>
                    <option value='2023'>2023</option>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                </select>

                <input
                    type='text'
                    placeholder='Buscar por código'
                    value={filters.code}
                    onChange={(e) => handleFilterChange('code', e.target.value)}
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

