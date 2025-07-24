Sitio Web de El Pollo Supremo
Este es el repositorio del sitio web oficial de "El Pollo Supremo", una plataforma de medios dedicada a la transmisión y difusión de torneos de básquetbol en Oaxaca, México. El proyecto está construido con un stack moderno usando Next.js para el frontend y Strapi como Headless CMS para la gestión de contenido.

Tecnologías Utilizadas
Frontend:

Next.js (React Framework)

TypeScript

Tailwind CSS para estilos.

Framer Motion para animaciones.

Embla Carousel para carruseles.

React Icons para íconos.

Backend (CMS):

Strapi (Headless CMS)

Base de datos SQLite (para desarrollo local)

Requisitos Previos
Asegúrate de tener instalado el siguiente software en tu máquina:

Node.js (versión 18 o superior)

npm o yarn como gestor de paquetes.

Instalación y Ejecución Local
El proyecto está dividido en dos partes: el backend (Strapi) y el frontend (Next.js). Ambas deben estar corriendo simultáneamente para que el sitio funcione.

Parte 1: Iniciar el Backend (Strapi)
Navega a la carpeta del backend:

Bash

cd el-pollo-supremo-cms
Instala las dependencias:

Bash

npm install
Inicia el servidor de Strapi en modo de desarrollo:

Bash

npm run develop
El backend ahora estará corriendo en http://localhost:1337. La primera vez que lo inicies, deberás crear una cuenta de administrador y añadir contenido (partidos, videos, etc.) para que el frontend tenga qué mostrar.

Parte 2: Iniciar el Frontend (Next.js)
Abre una nueva terminal (deja la terminal del backend corriendo).

Navega a la carpeta del frontend:

Bash

cd el-pollo-supremo-web
Instala las dependencias:

Bash

npm install
Configura las variables de entorno:

Crea un archivo en la raíz de el-pollo-supremo-web llamado .env.local.

Copia y pega el siguiente contenido, reemplazando con la información real:

NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
NEXT_PUBLIC_WHATSAPP_NUMBER="5219511234567"
Inicia el servidor de desarrollo del frontend:

Bash

npm run dev
El sitio web ahora estará visible y funcionando en http://localhost:3000.

Resumen para Correr el Proyecto
Para correr el proyecto en tu día a día, necesitarás dos terminales:

Terminal 1:

Bash

cd el-pollo-supremo-cms
npm run develop
Terminal 2:

Bash

cd el-pollo-supremo-web
npm run dev
Luego, abre http://localhost:3000 en tu navegador.
