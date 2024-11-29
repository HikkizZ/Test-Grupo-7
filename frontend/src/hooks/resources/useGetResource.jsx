import { useState } from 'react';
import { getResource } from '@services/resource.service.js';

export function useGetResource() {
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchResource = async ({ id, name }) => {
        try {
            setLoading(true);
            setError('');
            const result = await getResource({ id, name });
            setResource(result);
        } catch (err) {
            setError(err);
            setResource(null);
        } finally {
            setLoading(false);
        }
    };

    return { resource, loading, error, fetchResource };
}
