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
- `authRouters.js` valida register y login con Zod antes de llegar al controller
- `movieRouters.js` conecta controllers reales para listar, crear, actualizar y borrar
- `movieRouters.js` deja `GET` publico y protege `POST`, `PUT` y `DELETE`
- `movieRouters.js` valida `POST` y `PUT` con Zod
- `watchListRouters.js` protege watchlist con `authMiddleware`
- `watchListRouters.js` ya permite listar la watchlist autenticada con `GET`
- `watchListRouters.js` valida `POST` y `PUT` con Zod antes de llegar al controller

Los routers no deberian tener la logica principal del negocio. Su trabajo es recibir la peticion y delegarla al controller correspondiente.
