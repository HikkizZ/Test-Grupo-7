import { EntitySchema } from "typeorm";

const newsSchema = new EntitySchema({
  name: "News",
  tableName: "news",
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    tituloNews: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    contenido: {
      type: 'text',
      nullable: true
    },
    imagenPortada: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    fechaPublicacion: {
      type: 'timestamp with time zone',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
    fechaUpdate : {
      type: 'timestamp with time zone',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
  },
  // Definimos la relación entre la noticia y el usuario (autor)
  relations: {
    autor: {
      target: "User", // Apunta a la entidad User
      type: "many-to-one", // Muchas noticias pueden pertenecer a un usuario
      joinColumn: {
        name: "autorId" // Nombre de la columna que almacenará el ID del autor
      },
      cascade: true // Las operaciones en la noticia afectarán al autor relacionado
    }
  },
  // Definimos índices para optimizar las búsquedas
  indices: [
    {
      name: "IDX_NEWS_TITLE",
      columns: ["tituloNews"],
    },
    {
      name: "IDX_NEWS_DATE",
      columns: ["fechaPublicacion"],
    },
    {
      name: "IDX_NEWS_TITLE_DATE",
      columns: ["tituloNews", "fechaPublicacion"],
    },
  ],
});

export default newsSchema;