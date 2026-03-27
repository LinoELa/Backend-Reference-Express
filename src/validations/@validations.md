# @validations

Esta carpeta guarda los schemas y middlewares de validacion del proyecto.

Aqui se define:

- que campos son obligatorios
- que formato debe tener cada dato
- que mensajes de error devolvemos si el body no es valido

En este proyecto actual:

- `validateRequest.js` valida `req.body` con un schema de Zod
- `authValidation.js` define los schemas de register y login
- `movieValidation.js` define los schemas de create y update movie
- en `movieValidation.js` el campo `createdBy` no viaja en el body
- `watchlistValidation.js` define los schemas de crear y actualizar watchlist

La idea es sacar estas reglas fuera de los controllers para que:

- el controller quede mas limpio
- la validacion se pueda reutilizar
- los errores sean mas consistentes
