# Plataforma de Gestión Académica

The objective of this project is to develop a comprehensive academic management platform for high schools, centralizing timetable planning, classroom assignment, grade management, and communication between teachers, students and parents using PERN Stack technologies.

Este proyecto tiene como objetivo desarrollar una plataforma integral de gestión académica para liceos, centralizando la planificación de horarios, la asignación de aulas, la gestión de calificaciones, y la comunicación entre docentes, estudiantes y apoderados utilizando tecnologías de Stack PERN.

## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales. `backend` y `frontend`. Cada una de ellas contiene los recursos necesarios para sus respectivas funcionalidades.

``` markdown
StackPERN-SandBox/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── handlers/
│   │   ├── helpers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── test/
│   ├── .gitignore
│   ├── .gitkeep
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── server.js
│
├── frontend/
│   ├── .gitignore
│   └── README.md
│
├── LICENSE
└── README.md
```

## Backend

El backend de este proyecto está construido utilizando **Node.js**, **Express** y **PostgreSQL** como base de datos. Se han organizado las funcionalidades en controladores, rutas, servicios y modelos, siguiendo una estructura modular que facilita la escalabilidad y el mantenimiento. El sistema de rutas maneja los diferentes módulos del proyecto, mientras que los controladores gestionan la lógica de negocio y los servicios se encargan de la comunicación con la base de datos.

>[!NOTE]
Para más detalles sobre el backend, consulta el README específico del backend.

## Fronend

El frontend será desarrollado utilizando **React**. Actualmente, no hay implementaciones en esta carpeta, pero se añadirán en futuras fases del proyecto para proporcionar una interfaz de usuario amigable y fácil de usar.

## Tecnologías

Este proyecto utiliza el stack PERN (PostgreSQL, Express, React, Node.js) para el desarrollo del frontend y el backend:

- **PostgreSQL**: Sistema de gestión de bases de datos relacional para el almacenamiento de datos.
- **Express**: Framework de Node.js para la construcción del backend.
- **React**: Biblioteca para la construcción del frontend.
- **Node.js**: Entorno de ejecución para el desarrollo del backend.

## Requisitos

Para poder ejecutar el proyecto, se requieren las siguientes herramientas instaladas en el sistema:

- **Node.js**
- **npm**
- **PostgreSQL**

## Instalación y configuración

### Clonar el repositorio

``` bash
git clone https://github.com/HikkizZ/Project-ISW-2024
cd Project-ISW-2024
```

### Backend install

1. Navega a la carpeta del backend:

    ``` bash
    cd backend/
    ```

2. Instala las dependencias:

    ``` bash
    npm install
    ```

3. Configura la base de datos PostgreSQL y actualiza las credenciales en el archivo de configuración (aún por definir, se recomienda colocar las credenciales en un archivo .env para mayor seguridad).

4. Ejecuta el servidor en modo desarrollo:

    ``` bash
    npm run dev
    ```

El servidor estará corriendo (de manera local por el momento) en http:localhost:3000

### Frontend install

Actualmente, el frontend aún no se ha implementado. Pronto se añadirán instrucciones para configurar y ejecutar el frontend en futuras fases del proyecto.

## Scripts Disponibles

### Backend Scripts

- `npm run dev`: Inicia el servidor en modo desarrollo usando nodemon.
- `npm start`: Inicia el servidor en modo producción.

## Licencia

Este proyecto está bajo la licencia MIT.

## Autores

- Patricia González Caamaño
- Felipe Miranda Rebolledo
- Hallam Saavedra Álvarez
- Juan Yañez Romero
