# @utils

Esta carpeta guarda utilidades reutilizables.

Una utilidad es una funcion o archivo de apoyo que puede ser usada desde varios controllers o modulos.

Ejemplo:

- `generateToken.js`: se puede usar para centralizar la creacion de JWT

La idea es evitar repetir codigo en distintas partes del proyecto.

En este proyecto, `generateToken.js` recibe el `UUID` del usuario y firma el JWT con `JWT_SECRET`.
