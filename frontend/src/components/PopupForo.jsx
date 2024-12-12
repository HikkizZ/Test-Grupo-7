import React, { useState, useEffect } from 'react';

const PopupForo = ({ show, setShow, data, action }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setContent(data.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [data]);

    const handleSubmit = () => {
        const formData = { title, content };
        action(formData);
    };

    if (!show) return null;

    return (
        <div className="popup-overlay" onClick={() => setShow(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>{data ? 'Editar Foro' : 'Nuevo Foro'}</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Escribe el título del foro"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Escribe el contenido del foro"
                        />
                    </div>
                    <button type="button" onClick={handleSubmit}>
                        {data ? 'Actualizar Foro' : 'Crear Foro'}
                    </button>
                    <button type="button" onClick={() => setShow(false)}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupForo;
