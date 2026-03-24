# JWT Authentication y Controllers

## Authentication

La autenticacion sirve para comprobar quien es el usuario que intenta entrar en tu API.

En un flujo normal de backend, el usuario:

1. se registra
2. inicia sesion
3. recibe un token
4. envia ese token en rutas protegidas

## Que es JWT

JWT significa `JSON Web Token`.

Es un token que el servidor genera despues de validar al usuario. Luego el cliente lo manda en cada peticion protegida.

Normalmente se envia asi:

```http
Authorization: Bearer <token>
```

## Flujo comun de autenticacion

### Register

En el registro normalmente haces esto:

- recibir nombre, email y password
- validar que los campos existan
- comprobar si el usuario ya existe
- hacer hashing de la password con `bcryptjs`
- guardar el usuario en la base de datos
- devolver respuesta de exito

### Login

En el login normalmente haces esto:

- buscar al usuario por email
- comprobar la password
- generar un token JWT
- devolver el token al frontend

## Que hace un Controller

Un controller contiene la logica de negocio de una ruta.

Por ejemplo:

- el router recibe la peticion
- el controller procesa la informacion
- el controller devuelve la respuesta

### Ejemplo de separacion

```javascript
router.post("/register", register);
```

Aqui el router solo define la ruta. La funcion `register` vive en el controller.

## Estructura recomendada

```text
src/
  controllers/
    authController.js
  routers/
    authRouters.js
  config/
    db.js
```

## Ejemplo de controller basico

```javascript
const register = async (req, res) => {
  const body = req.body;

  return res.status(201).json({
    message: "Usuario registrado correctamente",
    data: body,
  });
};

export { register };
```

## Ejemplo de router basico

```javascript
import express from "express";
import { register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

export default router;
```

## Buenas practicas en autenticacion

- no guardes passwords en texto plano
- usa hash con `bcryptjs`
- valida email y password antes de guardar
- no devuelvas la password en la respuesta
- usa variables de entorno para la clave secreta del JWT
- separa router, controller y acceso a base de datos

## Librerias comunes para auth

```bash
npm install jsonwebtoken bcryptjs
```

## Hashing con bcryptjs

Si vas a guardar passwords, primero debes convertirlas a un hash.

Instalacion:

```bash
npm i bcryptjs
```

Ejemplo basico:

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

## Ejemplo de respuestas tipicas

- `201 Created`: usuario creado correctamente
- `200 OK`: login correcto
- `400 Bad Request`: faltan datos o son invalidos
- `401 Unauthorized`: credenciales incorrectas
- `409 Conflict`: email ya registrado
- `500 Internal Server Error`: error interno del servidor

## Resumen

En esta parte del proyecto, `authRouters` define las rutas y `authController` contiene la logica. Mas adelante puedes ampliar esto con:

- `login`
- `logout`
- middleware de autenticacion
- middleware para proteger rutas
- generacion y validacion de JWT
