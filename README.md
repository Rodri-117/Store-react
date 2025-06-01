# E-Commerce de Ropa - React + Firebase

Este proyecto es una tienda online de ropa desarrollada con React.js como framework principal y Firebase para la base de datos. Permite a los usuarios navegar productos, filtrarlos por categoría, ver detalles, agregar al carrito y simular una compra.

## Tecnologías Utilizadas

    - React.js (Vite)
    - Firebase (Firestore)
    - CSS Modules / SCSS
    - Context API + LocalStorage para carrito
    - SweetAlert2 para notificaciones

## Funcionalidades Principales

    - Filtro de productos por categoría.
    - Detalle individual con descripción e imagen.
    - Selector de cantidad (con control de stock).
    - Carrito persistente (guardado en localStorage).
    - Cálculo de total y manejo de stock.
    - Notificaciones con SweetAlert.


## Instalación

1. Instalación de software: 

    - Node >= 18.0.0
    - Vite >= 3.1.4

2. Instalación de dependencias:

    ```
    npm install
    ```

3. Configurar el archivo .env

    ```
    VITE_FIREBASE_API_KEY=tu_api_key
    VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
    VITE_FIREBASE_PROJECT_ID=tu_project_id
    VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
    VITE_FIREBASE_APP_ID=tu_app_id
    ```

4. Levantar el proyecto

    ```
    npm run dev
    ```

## Librerias

    - Bootstrap
    - Firebase
    - React-router-dom