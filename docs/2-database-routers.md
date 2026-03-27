# Database y Routers

## Database

Para esta parte del proyecto se usa PostgreSQL con Neon.

Pasos base:

- crear una cuenta en Neon
- crear un proyecto
- copiar la cadena de conexion
- guardarla luego en `DATABASE_URL`

## Idea de los routers

La idea es crear un router por modulo o recurso del proyecto.

En este proyecto actual ya tenemos:

- `authRouters.js`
- `movieRouters.js`
- `watchListRouters.js`

Cada router se encarga de:

- definir la URL
- definir el metodo HTTP
- conectar middlewares si hacen falta
- conectar validaciones si hacen falta
- delegar la logica al controller correspondiente

## Conexion de routers en `server.js`

Los routers se montan desde el archivo principal con `app.use()`:

```javascript
app.use("/movies", movieRouters);
app.use("/auth", authRouters);
app.use("/watchlist", watchListRouters);
```

## Ejemplo simple de router

```javascript
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Obtener todos los recursos" });
});

router.post("/", (req, res) => {
  res.json({ message: "Crear un nuevo recurso" });
});

export default router;
```

## Importante

En este proyecto los routers no deberian tener la logica principal del negocio.

Su trabajo es:

- recibir la peticion
- pasar por middlewares o validaciones si toca
- llamar al controller final
