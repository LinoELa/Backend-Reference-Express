# @middlewares

Esta carpeta guarda middlewares reutilizables del proyecto.

Un middleware sirve para ejecutar logica antes de que la peticion llegue al controller.

Por ejemplo, un middleware puede:

- validar token
- comprobar permisos
- leer datos del usuario autenticado
- bloquear accesos no permitidos

## Middleware actual

- `authMiddleware.js`

## Idea de esta fase

Ahora mismo `authMiddleware.js` ya tiene una primera version funcional.

Ahora mismo ese middleware:

- intenta leer el token desde `Authorization: Bearer <token>`
- tambien intenta leerlo desde la cookie `token`
- requiere `cookie-parser` si queremos leer cookies en Express
- lee el JWT
- lo valida
- obtener el usuario autenticado
- guardar el usuario en `req.user`
- permitir o bloquear el acceso a `watchlist`

## Importante

Esta carpeta es clave porque aqui ira la proteccion de rutas privadas.

En este proyecto, el objetivo principal del middleware es asegurar que solo un usuario autenticado pueda trabajar con su watchlist.
