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
    nombreAutor: {
      type: 'varchar',
      length: 60,
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