import { useEffect, useState } from 'react';
import { createResource, getResources, deleteResource } from '@services/resource.service.js';
import {deleteDataAlert, showSuccessAlert} from '../utils/alerts.js';

export default function Resources() { 
    const [resources, setResources] = useState([]);

    const fetchResources = async () => {
        try {
            const response = await getResources();
            setResources(response);
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
    }



    useEffect(() => {
        fetchResources();
    }, []);

    const [showForm, setShowForm] = useState(false);
const [newResourceName, setNewResourceName] = useState("");

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
        {resources.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map((resource, index) => (
                        <tr key={index}>
                            <td>{resource.id}</td>
                            <td>{resource.name}</td>
                            <button onClick={() => handleDelete(resource.id)}>Eliminar</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <h2>No hay recursos disponibles</h2>
        )}
    </div>
);
}
// export default function Resources() {
//     return (
//         <div>
//             <h1>PAGINA DE RECURSOS</h1>
//             <h1>PAGINA DE RECURSOS</h1>
//             <h1>PAGINA DE RECURSOS</h1>
//             <h1>PAGINA DE RECURSOS</h1>
//             <h1>PAGINA DE RECURSOS</h1>
//         </div>
//     )
// }
