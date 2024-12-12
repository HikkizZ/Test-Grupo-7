import React from "react";
import { useGetForos } from "@hooks/foro/useGetForos";  // Asegúrate de que la ruta sea correcta
import ForoTable from "@components/ForoTable";  // El componente de la tabla de foros

export default function ForosList() {
    const { foros, loading, error } = useGetForos();  // Usamos el hook para obtener los foros

    return (
        <div>
            <h1>Lista de Foros</h1>

            {/* Mostrar estado de carga */}
            {loading ? (
                <p>Cargando foros...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>  // Mostrar error si ocurre
            ) : (
                <ForoTable foros={foros} />  // Mostrar tabla de foros si todo está bien
            )}
        </div>
    );
}
