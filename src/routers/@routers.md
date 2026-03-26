# @routers

Esta carpeta guarda las rutas de la API.

Aqui se define:

- la URL de cada endpoint
- el metodo HTTP que responde
- que controller maneja la peticion

Ejemplos:

- `authRouters.js`: rutas de autenticacion como register y login
- `movieRouters.js`: rutas relacionadas con peliculas
- `watchListRouters.js`: rutas relacionadas con la watchlist

En este proyecto actual:

- `authRouters.js` trabaja con `registerController`, `loginController` y `logoutController`
- `movieRouters.js` esta preparado como base para las rutas de peliculas
- `watchListRouters.js` conecta la ruta para agregar peliculas a la watchlist

Los routers no deberian tener la logica principal del negocio. Su trabajo es recibir la peticion y delegarla al controller correspondiente.
