# @auth

Esta subcarpeta agrupa los controllers del modulo de autenticacion.

Aqui se coloca la logica relacionada con:

- registro de usuarios
- login
- logout
- generacion de tokens JWT
- validacion de credenciales
- trabajo conjunto con validaciones de Zod en las rutas

En este proyecto el login genera el token usando `user.id`, y ese `id` ahora es un `UUID`.

Los controllers de esta carpeta se exportan con nombres completos:

- `registerController`
- `loginController`
- `logoutController`

La idea es tener junto todo lo relacionado con auth para que el proyecto quede mas ordenado.

Las validaciones del body no viven aqui, sino en [`authValidation.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/validations/authValidation.js), y se aplican desde el router antes de llegar al controller.
