export default function CalendarEvent({ post, onClick, onDelete }) {
    return (
        <div className="calendar-event">
            <h4>{post.titulo}</h4>
            <button onClick={() => onClick(post)}>Ver / Editar</button>
            <button onClick={() => onDelete(post.id)}>Eliminar</button>
        </div>
    );
}
