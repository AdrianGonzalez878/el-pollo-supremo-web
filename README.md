# Sitio Web de El Pollo Supremo 🏀

<div align="center">
  <img src="public/logo.png" alt="Logo de El Pollo Supremo" width="200"/>
</div>

<p align="center">
  <strong>La plataforma de medios oficial para el narrador de básquetbol oaxaqueño "El Pollo Supremo".</strong>
  <br />
  Un sitio web dinámico construido con un stack moderno para mostrar torneos, videos, patrocinadores y más.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Strapi-2E7EEA?style=for-the-badge&logo=strapi&logoColor=white" alt="Strapi">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

---

## 🚀 Descripción del Proyecto

Este proyecto es el sitio web oficial de "El Pollo Supremo", una popular marca de transmisiones de básquetbol en Oaxaca, México. La plataforma sirve como un centro de operaciones digital para centralizar todo el contenido, incluyendo:
* Un calendario y archivo de torneos.
* Una videoteca de partidos completos y jugadas destacadas.
* Una sección para patrocinadores.
* Una tienda en línea (maqueta) para venta de mercancía.

Todo el contenido es gestionado a través de un **Headless CMS (Strapi)**, permitiendo al cliente final actualizar el sitio en tiempo real sin necesidad de tocar el código.

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - **Framework:** Next.js (App Router)
  - **Lenguaje:** TypeScript
  - **Estilos:** Tailwind CSS
  - **Animaciones:** Framer Motion
  - **Carruseles:** Embla Carousel
  - **Íconos:** React Icons
- **Backend (CMS):**
  - **Plataforma:** Strapi (Headless CMS)
  - **Base de Datos (Local):** SQLite

## 📋 Requisitos Previos

Asegúrate de tener instalado el siguiente software en tu máquina:
- **Node.js:** Versión 18.x o superior.
- **npm** o **yarn** como gestor de paquetes.

## ⚙️ Instalación y Ejecución Local

El proyecto está dividido en dos partes: **backend** y **frontend**. Ambas deben estar corriendo simultáneamente.

### Parte 1: Backend (Strapi)

1.  **Navegar a la carpeta del backend:**
    ```bash
    cd el-pollo-supremo-cms
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Iniciar el servidor de Strapi:**
    ```bash
    npm run develop
    ```
    - 🟢 El backend estará corriendo en `http://localhost:1337`.
    - 🔑 La primera vez, crea tu cuenta de administrador en `http://localhost:1337/admin`.
    - ✍️ Añade contenido (partidos, videos, etc.) para que el frontend pueda mostrarlo.

### Parte 2: Frontend (Next.js)

1.  **Abrir una nueva terminal.**
2.  **Navegar a la carpeta del frontend:**
    ```bash
    cd el-pollo-supremo-web
    ```
3.  **Instalar dependencias:**
    ```bash
    npm install
    ```
4.  **Configurar variables de entorno:**
    - Crea un archivo en la raíz de `el-pollo-supremo-web` llamado `.env.local`.
    - Copia y pega el siguiente contenido, reemplazando con la información real:
      ```env
      NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
      NEXT_PUBLIC_WHATSAPP_NUMBER="5219511234567"
      ```
5.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    - 🟢 El sitio web estará visible en `http://localhost:3000`.

## ⚡ Resumen para Correr el Proyecto

Para poner en marcha el proyecto, necesitarás dos terminales abiertas:

- **Terminal 1 (Backend):** `cd el-pollo-supremo-cms && npm run develop`
- **Terminal 2 (Frontend):** `cd el-pollo-supremo-web && npm run dev`

## ✨ Visualización del Frontend ✨

Aquí puedes ver algunas capturas de pantalla del sitio web en funcionamiento:

### Página de Inicio
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 44 32 p m" src="https://github.com/user-attachments/assets/8f2848f3-4d2b-4eef-8db6-9c9fd77ad515" />
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 44 49 p m" src="https://github.com/user-attachments/assets/4176f254-72e2-4e01-8f42-0abab77c3bf8" />
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 45 03 p m" src="https://github.com/user-attachments/assets/decbcd4f-e416-45b3-a15e-ea172bbdc706" />
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 45 11 p m" src="https://github.com/user-attachments/assets/0556cef5-f915-4036-a4f0-b38cc7b527e6" />


### Calendario de Torneos
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 45 35 p m" src="https://github.com/user-attachments/assets/6012be7b-8f78-447a-b7bd-364da0a40599" />
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 45 40 p m" src="https://github.com/user-attachments/assets/3b0e665c-72d5-4e18-bc11-3742828085a4" />

### Videoteca Destacada
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 45 51 p m" src="https://github.com/user-attachments/assets/e85fe279-b8ce-41f2-a2e5-55eb2b13fb5c" />
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 46 02 p m" src="https://github.com/user-attachments/assets/bdbbdd04-5734-40bf-a46d-a96d580bfb7c" />

### Tienda Oficial
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 46 14 p m" src="https://github.com/user-attachments/assets/7876e0e6-90c1-4aa8-b41d-f1d90c6f2d65" />

### Página de Patrocinadores
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 46 24 p m" src="https://github.com/user-attachments/assets/0bd295ad-b5df-4afb-af46-6d216c4fbc6e" />

### Página de Contacto
<img width="800" height="1000" alt="Captura de pantalla 2025-07-23 a la(s) 9 46 36 p m" src="https://github.com/user-attachments/assets/dac21de7-21f8-48a6-854f-46473c496864" />




