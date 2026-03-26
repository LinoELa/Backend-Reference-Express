# @generateToken

Este archivo sirve para generar un `JWT` cuando un usuario inicia sesion correctamente.

## Que hace

`generateToken.js` centraliza la logica de firma del token para no repetirla dentro de cada controller.

Recibe el `id` del usuario y crea un payload minimo.

En este proyecto actual, ese `id` es un `UUID`.

El payload queda asi:

- `id`

Luego firma ese payload con `jsonwebtoken` usando la clave `JWT_SECRET` guardada en `.env`.

Opcionalmente tambien puede recibir `res` para guardar el token en una cookie `httpOnly`.

## Importante

- la password del usuario se protege con `bcrypt`
- el `id` del JWT no va encriptado
- el token va firmado con `JWT_SECRET`

Eso significa que el `UUID` puede verse dentro del payload si alguien decodifica el token, pero no puede modificarse libremente sin invalidar la firma.

## Que necesita en `.env`

```env
JWT_SECRET="tu_clave_super_secreta"
JWT_EXPIRES_IN="7d"
```

- `JWT_SECRET`: clave para firmar el token
- `JWT_EXPIRES_IN`: tiempo de expiracion del token

## Ejemplo de uso

```javascript
import { generateToken } from "../../utils/token/generateToken.js";

const token = generateToken(user.id, res);
```

## Ejemplo de respuesta en login

```javascript
return res.status(200).json({
  message: "Login exitoso",
  token,
});
```

La ventaja de esta utilidad es que si mas adelante cambias el payload, la expiracion o la forma de guardar el token, solo lo haces en un sitio.
