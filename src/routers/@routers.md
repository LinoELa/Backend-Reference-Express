# @routers

Esta carpeta guarda las rutas de la API.

Aqui se define:

- la URL de cada endpoint
- el metodo HTTP que responde
- que controller maneja la peticion

Ejemplos:

- `authRouters.js`: rutas de autenticacion como register y login
- `movieRouters.js`: rutas relacionadas con peliculas

En este proyecto actual:

- `authRouters.js` trabaja con `register`, `login` y `logout`
- `movieRouters.js` esta preparado como base para las rutas de peliculas

Los routers no deberian tener la logica principal del negocio. Su trabajo es recibir la peticion y delegarla al controller correspondiente.
