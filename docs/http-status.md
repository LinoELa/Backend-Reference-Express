# HTTP Status

## Que son los codigos HTTP

Los codigos HTTP son numeros que el servidor devuelve para indicar el resultado de una peticion.

Ayudan a saber si todo salio bien, si el cliente envio algo mal o si el error viene del servidor.

## Rangos principales

- `1xx`: informacion
- `2xx`: exito
- `3xx`: redireccion
- `4xx`: error del cliente
- `5xx`: error del servidor

## Codigos mas usados en una API REST

### 200 OK

La peticion fue correcta.

Ejemplo:

- obtener usuarios
- obtener peliculas
- login correcto

### 201 Created

Se creo un recurso nuevo correctamente.

Ejemplo:

- registrar un usuario
- crear una pelicula

### 204 No Content

La operacion fue correcta, pero no hace falta devolver contenido.

Ejemplo:

- borrar un recurso

### 400 Bad Request

El cliente envio datos incorrectos o incompletos.

Ejemplo:

- falta el email
- falta la password
- el body viene mal formado

### 401 Unauthorized

El usuario no esta autenticado o el token no es valido.

Ejemplo:

- no se envio token
- el JWT expiro
- password incorrecta

### 403 Forbidden

El usuario esta autenticado, pero no tiene permiso para acceder.

Ejemplo:

- intentar borrar un recurso sin ser admin

### 404 Not Found

No se encontro el recurso solicitado.

Ejemplo:

- pelicula inexistente
- usuario inexistente

### 409 Conflict

Hay un conflicto con el estado actual del recurso.

Ejemplo:

- email ya registrado
- pelicula duplicada en watchlist

### 422 Unprocessable Entity

Los datos tienen formato correcto, pero no pasan la validacion.

Ejemplo:

- email con formato invalido
- password demasiado corta

### 500 Internal Server Error

Error interno del servidor.

Ejemplo:

- fallo de base de datos
- error no controlado en el backend

## Ejemplos en Express

### Respuesta exitosa

```javascript
return res.status(200).json({
  message: "Peticion correcta",
});
```

### Recurso creado

```javascript
return res.status(201).json({
  message: "Usuario creado correctamente",
});
```

### Error de validacion

```javascript
return res.status(400).json({
  message: "Faltan campos obligatorios",
});
```

### No autorizado

```javascript
return res.status(401).json({
  message: "Token invalido o ausente",
});
```

## Recomendacion para este proyecto

En este proyecto puedes usar estos codigos como base:

- `200` para lecturas correctas
- `201` para crear usuarios o peliculas
- `400` para datos invalidos
- `401` para errores de autenticacion
- `404` para recursos no encontrados
- `409` para duplicados
- `500` para errores internos

## Resumen

Elegir bien el codigo HTTP hace que tu API sea mas clara, mas facil de depurar y mas profesional.
