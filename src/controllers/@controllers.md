# @controllers

Esta carpeta guarda la logica de negocio de las rutas.

Un controller normalmente:

- recibe datos desde `req.body`, `req.params` o `req.query`
- valida informacion
- habla con la base de datos o con utilidades
- construye la respuesta con `res.status(...).json(...)`

Dentro de `auth/` se agrupan los controllers relacionados con autenticacion, como:

- `registerController.js`
- `loginController.js`
- `logoutController.js`
