# Database & Routers

## Database

https://neon.com/

- Crear una cuenta en Neon.
- Crear un proyecto.    

## Routers
- Crear un router para cada recurso de tu API (por ejemplo, usuarios, productos, etc.).
- En cada router, define las rutas para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
- Importar los routers en tu archivo principal (por ejemplo, `server.js`) y usarlos con `app.use()`.
- Ejemplo de un router para usuarios:

```javascript
import express from 'express';
const router = express.Router();
// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  // Lógica para obtener usuarios de la base de datos
  res.json({messaje : 'Obtener todos los usuarios' });
});
// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
  // Lógica para crear un nuevo usuario en la base de datos
  res.send('Crear un nuevo usuario');s
});
export default router;
```
