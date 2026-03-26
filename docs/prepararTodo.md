# prepararTodo

## Que significa "prepara todo"

Cuando en este proyecto se diga `prepara todo`, no significa hacer solo el cambio puntual que se ha pedido.

Significa revisar y dejar cerrado todo el bloque relacionado con esa parte del proyecto.

## Que se tiene que revisar

Si se pide `prepara todo`, hay que revisar:

- codigo
- comentarios
- imports y exports
- nombres de funciones
- nombres de archivos
- routers
- controllers
- utils
- seeds
- scripts de `package.json`
- archivos `@...md`
- documentacion general como `README.md` y `docs/...`

## Que se tiene que corregir

Ademas del cambio principal, tambien hay que corregir:

- errores obvios
- partes copiadas mal
- nombres inconsistentes
- comentarios que no encajan con el codigo real
- rutas mal conectadas
- archivos nuevos sin documentar
- carpetas nuevas sin su `@...md`
- indices generales que no mencionan modulos nuevos

## Que se tiene que agregar

Si falta algo necesario para que el bloque quede completo, tambien se debe agregar.

Por ejemplo:

- crear un `@watchList.md` si aparece una carpeta nueva `watchList`
- actualizar [`@controllers.md`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/controllers/@controllers.md) si aparece un nuevo grupo de controllers
- actualizar [`@routers.md`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/@routers.md) si aparece un router nuevo
- actualizar seeds y su documentacion si cambia la estructura de `prisma/seed`
- actualizar `README.md` o `docs/...` si el proyecto ya no coincide con lo escrito

## Idea principal

`prepara todo` significa:

- no dejar medias partes
- no esperar a que te pidan cada detalle por separado
- revisar lo relacionado
- completar lo que falte
- dejar esa parte lista para seguir con el siguiente bloque

## Ejemplo practico

Si se crea `watchList`:

- no basta con crear `watchListController.js`
- tambien hay que revisar el router
- tambien hay que revisar si `server.js` monta la ruta
- tambien hay que crear `@watchList.md`
- tambien hay que actualizar `@controllers.md`
- tambien hay que revisar la documentacion si ya afecta al flujo del proyecto

## Objetivo

La idea de `prepara todo` es que cada bloque quede:

- mas limpio
- mas claro
- documentado
- consistente
- listo para continuar con la siguiente parte del proyecto
