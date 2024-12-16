import { useEffect } from "react";
import { useCreateForo } from "@hooks/foro/useCreateForo";  // Hook adaptado para foros
import { useDeleteForo } from "@hooks/foro/useDeleteForo";  // Hook adaptado para foros
import { useGetForos } from "@hooks/foro/useGetForos";  // Hook adaptado para foros
import { useUpdateForo } from "@hooks/foro/useUpdateForo";  // Hook adaptado para foros
import ForoForm from "@components/ForoForm";  // Formulario para foros
import ForoTable from "@components/ForoTable";  // Tabla para foros

// IMPORT CSS
import "../styles/Foro.css";  

export default function Foros() {
    const { foros, fetchForos, loading: loadingForos } = useGetForos();
    const { handleCreate, loading: loadingCreate } = useCreateForo(fetchForos);
    const { handleDelete, loading: loadingDelete } = useDeleteForo(fetchForos);
    const { handleUpdate, loading: loadingUpdate } = useUpdateForo(fetchForos);

    useEffect(() => {
        fetchForos(); // Cargar foros cuando el componente se monta
    }, [fetchForos]);

    return (
        <div className="foro-container"> {/* Clase contenedora para aislar estilos */}
            <br />
            <br />
            <br />
            <br />
            <h1>Foros</h1>

            {/* Crear foro */}
            <h3>Crear Foro</h3>
            <ForoForm onCreate={handleCreate} loading={loadingCreate} />

            {/* Lista de foros */}
            <h3>Lista de Foros</h3>
            <ForoTable
                foros={foros}  // Muestra la lista de foros siempre
                onDelete={handleDelete}
                loadingDelete={loadingDelete}
                onUpdate={handleUpdate}
                loadingUpdate={loadingUpdate}
            />
            {loadingForos && <p>Cargando foros...</p>} {/* Mensaje de carga debajo de la tabla */}
        </div>
    );
}