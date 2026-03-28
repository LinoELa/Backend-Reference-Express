# JWT Authentication y Controllers

## Authentication

La autenticacion sirve para comprobar quien es el usuario que intenta entrar en tu API.

En un flujo normal de backend, el usuario:

1. se registra
2. inicia sesion
3. recibe un token
4. usa ese token en rutas protegidas
5. puede cerrar sesion con logout

## Que es JWT

JWT significa `JSON Web Token`.

Es un token que el servidor genera despues de validar al usuario. Luego el cliente lo manda en cada peticion protegida.

Normalmente se puede usar de dos formas:

- en el header `Authorization: Bearer <token>`
- guardado en una cookie `httpOnly`

## Instalacion de librerias

Para esta parte del proyecto vas a usar:

```bash
npm install jsonwebtoken bcryptjs
```

- `bcryptjs`: para hacer hashing de passwords
- `jsonwebtoken`: para generar y verificar JWT

## Flujo comun de autenticacion

### Register

En el registro normalmente haces esto:

- recibir `name`, `email` y `password`
- validar que los campos existan
- comprobar si el usuario ya existe
- hacer hashing de la password con `bcryptjs`
- guardar el usuario en la base de datos
- devolver respuesta de exito

### Login

En el login normalmente haces esto:

- buscar al usuario por email
- comprobar la password con `bcrypt.compare()`
- generar un token JWT
- devolver el token al frontend
- opcionalmente guardar el token en cookie

### Logout

En el logout normalmente haces esto:

- limpiar la cookie del token
- devolver una respuesta de exito

## JWT_SECRET y archivo `.env`

Para firmar el token necesitas una clave secreta.

Esa clave no debe escribirse directamente dentro del codigo. Debe guardarse en el archivo `.env`.

Si este proyecto se usa como template, primero copia `.env.example` a `.env` y luego rellena los valores reales.

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Ejemplo:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="tu_url_de_postgresql"
JWT_SECRET="tu_clave_super_secreta"
JWT_EXPIRES_IN="7d"
```

- `JWT_SECRET`: clave privada usada para firmar el token
- `JWT_EXPIRES_IN`: tiempo de expiracion del token, por ejemplo `1d`, `7d` o `12h`

## Como generar una clave secreta segura

### macOS y Linux

```bash
openssl rand -base64 32
```

### Windows

Si tienes OpenSSL instalado o usas Git Bash, puedes probar:

```bash
openssl rand -base64 32
```

Si `openssl` no funciona en Windows, usa PowerShell:

```powershell
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### Opcion alternativa con Node.js

Esta opcion funciona en Windows, macOS y Linux si ya tienes Node.js instalado:

```bash
node --input-type=module -e "import { randomBytes } from 'node:crypto'; console.log(randomBytes(32).toString('base64'))"
```

Despues copias ese valor y lo pegas en `.env` dentro de `JWT_SECRET`.

## Que hace un Controller

Un controller contiene la logica de negocio de una ruta.

Por ejemplo:

- el router recibe la peticion
- el controller procesa la informacion
- el controller devuelve la respuesta

## Estructura actual del proyecto

```text
src/
  controllers/
    auth/
      registerController.js
      loginController.js
      logoutController.js
  routers/
    authRouters.js
  utils/
    token/
      generateToken.js
  config/
    db.js
```

## Rutas actuales de auth

```javascript
router.post("/register", validateRequest(registerSchema), registerController);
router.post("/login", validateRequest(loginSchema), loginController);
router.post("/logout", logoutController);
```

## Validacion en las rutas de auth

Ahora mismo `auth` tambien usa validaciones con Zod antes de llegar al controller.

Los archivos principales de esta parte son:

- [`validateRequest.js`](../../src/validations/validateRequest.js)
- [`authValidation.js`](../../src/validations/authValidation.js)

La idea es esta:

- el router recibe el body
- `validateRequest(schema)` valida los campos
- si algo falla, responde `400`
- si sale bien, el controller recibe `req.body` ya limpio

## Que hace cada archivo

### `registerController.js`

- recibe los datos del usuario
- valida campos obligatorios
- comprueba si el email ya existe
- hace hashing con `bcryptjs`
- crea el usuario en Prisma

### `loginController.js`

- recibe `email` y `password`
- busca al usuario por email
- compara la password con `bcrypt.compare()`
- genera el token con `generateToken(user.id, res)`
- devuelve el token y los datos basicos del usuario

### `logoutController.js`

- limpia la cookie `token`
- devuelve `200 OK`

### `generateToken.js`

- recibe `userId`
- firma un JWT con `JWT_SECRET`
- usa `JWT_EXPIRES_IN`
- si recibe `res`, guarda el token en una cookie `httpOnly`

## Ejemplo real de login controller

```javascript
const token = generateToken(user.id, res);

return res.status(200).json({
  message: "Login exitoso",
  data: {
    id: user.id,
    email: user.email,
  },
  token,
});
```

## Importante sobre `user.id`

En este proyecto actual, el login y el JWT trabajan con `user.id`.

Eso se ve en [`loginController.js`](../../src/controllers/auth/loginController.js):

```javascript
const token = generateToken(user.id, res);
```

Y tambien en [`generateToken.js`](../../src/utils/token/generateToken.js), donde el payload guarda ese valor:

```javascript
const payload = {
  id: userId,
};
```

Por eso, si el usuario viene normal desde Prisma, la forma correcta es:

```javascript
generateToken(user.id, res);
```

Si en otro proyecto el usuario viniera con otra estructura, por ejemplo `user._id` o `user.doc.id`, entonces tendrias que pasar ese valor real al token:

```javascript
generateToken(user._id, res);
```

## `id` en JWT no va encriptado

Es importante no confundir esto con la password.

- la `password` si se guarda hasheada con `bcrypt`
- el `id` dentro del JWT no va encriptado
- el JWT va firmado con `JWT_SECRET`

Eso significa que el payload del token se puede leer si alguien lo decodifica, por ejemplo:

```javascript
{
  id: "ce304397-4b03-4572-b45f-4c7220e61cbc",
  iat: 1774477143,
  exp: 1775081943
}
```

Lo importante aqui no es ocultar el `id`, sino asegurar que el token no pueda ser modificado sin la firma correcta.

En resumen:

- `bcrypt` protege passwords
- `jsonwebtoken` firma tokens
- `user.id` puede viajar dentro del payload del JWT sin problema

## Ejemplo real de logout controller

```javascript
res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});

return res.status(200).json({
  message: "Logout exitoso",
});
```

## Hashing con bcryptjs

Si vas a guardar passwords, primero debes convertirlas a un hash.

```javascript
import bcrypt from "bcryptjs";

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

Luego, en el login:

```javascript
const isMatch = await bcrypt.compare(password, user.password);
```

Si `isMatch` es `true`, la password es correcta.

## Ejemplo basico de JWT

En este proyecto actual el payload es minimo y solo guarda el `id`:

```javascript
const payload = {
  id: userId,
};
```

La firma del token se hace asi:

```javascript
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
});
```

## Cookie httpOnly

Ahora mismo `generateToken(user.id, res)` tambien puede guardar el token en cookie:

```javascript
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 24 * 7,
});
```

Esto ayuda a que el token no quede accesible desde JavaScript del navegador.

## Codigos HTTP usados aqui

- `201 Created`: usuario registrado correctamente
- `200 OK`: login correcto
- `200 OK`: logout correcto
- `400 Bad Request`: faltan datos
- `401 Unauthorized`: credenciales invalidas
- `409 Conflict`: email ya registrado
- `500 Internal Server Error`: error interno del servidor

## Checklist de esta seccion

Al terminar esta parte del proyecto ya deberias tener:

- registro de usuarios con hashing de password
- login con validacion de credenciales
- generacion de JWT
- `JWT_SECRET` configurado en `.env`
- logout para limpiar la cookie del token
- rutas de auth separadas de los controllers
- utilidad `generateToken.js` para no repetir logica
- `.env.example` listo para reutilizar el proyecto como template

## Resumen

Ahora mismo tu modulo de auth ya tiene:

- `register`
- `login`
- `logout`
- validacion de body con Zod en `register` y `login`
- hashing con `bcryptjs`
- generacion de JWT
- uso de `.env` para secretos
- soporte para cookie `httpOnly`

## Siguiente punto: middleware y watchlist

La base de middleware ya esta creada y conectada con `watchlist`.

Ahora el siguiente paso natural es pulir el flujo completo:

- hacer login real
- recibir el JWT
- usarlo por header o cookie
- dejar que `authMiddleware` cargue `req.user`
- trabajar la watchlist usando ese usuario autenticado

En otras palabras, el siguiente punto ya no es crear el middleware desde cero, sino probar y ampliar el flujo privado completo.


