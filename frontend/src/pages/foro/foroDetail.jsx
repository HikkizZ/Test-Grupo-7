import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForo } from '@services/foro.service';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getForo(id);
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!post) {
        return <div>Post no encontrado</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-2">
                    <div className="border-2 border-black p-4 mb-4">
                        <h1 className="text-xl font-bold">{post.titulo}</h1>
                    </div>
                    <div className="border-2 border-black p-4 mb-4">
                        <p className="text-lg">{post.nombreProfesor}</p>
                    </div>
                    <div className="border-2 border-black p-4">
                        <p className="text-lg">{post.categoria}</p>
                    </div>
                </div>
                <div className="border-2 border-black p-4">
                    <p className="text-lg">{post.fecha}</p>
                </div>
            </div>
            
            <div className="border-2 border-black p-4 mb-6 min-h-[300px]">
                <h2 className="text-xl mb-4">Contenido</h2>
                <p>{post.contenido || 'No hay contenido disponible'}</p>
            </div>
            
            <div className="border-2 border-black p-4">
                {/* Espacio adicional para contenido futuro */}
            </div>
        </div>
    );
}

