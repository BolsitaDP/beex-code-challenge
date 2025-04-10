# App de Perfil Deportivo

Esta es una aplicación móvil desarrollada con **React Native** y **Expo** que permite al usuario registrar y editar su información personal, como nombre, ciudad y nivel de juego, además de mostrar al usuario partidos disponibles con su respectiva información y distintos complejos deportivos. También incluye opciones de personalización como idioma (español/inglés) y diferentes temas.

## 📦 Tecnologías usadas

- **Expo**
- **React Native Paper**
- **AsyncStorage**
- **i18Next**

## Cómo ejecutar la app

1. Clona el repositorio:

   ```bash
   git clone https://github.com/BolsitaDP/beex-code-challenge
   cd beex-code-challenge

   ```

2. Instala las dependencias:

   ```bash
   npm install

   ```

3. Ejecutar la app con Expo
   ```bash
   npx expo start
   ```

Esto abrirá una pestaña en tu consola desde donde puedes escanear el código QR con la app de Expo Go o correr el simulador si tienes uno configurado.

## Enfoque del proyecto

Este proyecto fue desarrollado como respuesta a un code challenge cuyo objetivo es diseñar y construir una app móvil que simule una experiencia de:

- Registro de usuario

- Gestión de perfil

- Búsqueda y exploración de partidos deportivos

El foco estuvo en crear pantallas conectadas con navegación fluida, manejo eficiente del estado con persistencia local (usando AsyncStorage), y una presentación clara e intuitiva de la información.

Dado que no se requería desarrollo de backend, se optó por el uso de mocks para simular la información de partidos y complejos. Esto permitió centrarse en la experiencia de usuario, arquitectura del proyecto y buenas prácticas en React Native.
