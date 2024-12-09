import { EntitySchema } from "typeorm";


const newsSchema = new EntitySchema ({
    name : "News",
    tableName: "news",
    columns: {
        id: { //Id generado automaticamente
            type: 'int',
            primary: true,
            generated: true,
        },
        tituloNews: { // titulo de la publicación
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        nombreAutor: { //Autor de la publicación
            type: 'varchar',
            length: 60,
            nullable: false,
        },
        contenido: { //Contenido de la publicación
            type: 'text',
            nullable: true
        },
        fechaPublicacion: { //? This is the date when the grade was created.
            type: 'timestamp with time zone',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false,
        },

},
indices: [  //definimos indices, por defecto será la id, pero agregaremos opcionales.
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
