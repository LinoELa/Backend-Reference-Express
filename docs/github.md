# GitHub y flujo de trabajo

## Sistema que estamos llevando

En este proyecto estamos trabajando por bloques pequenos y dejando cada avance cerrado con commit.

La idea es esta:

- hacer una parte concreta del proyecto
- revisar codigo, comentarios y documentacion
- corregir lo que falte
- hacer commit cuando ese bloque ya este bien

No estamos haciendo commits por archivos sueltos, sino por avances funcionales.

## Regla interna: `preparar todo`

En este proyecto ya existe una regla interna llamada [`prepararTodo.md`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/docs/prepararTodo.md).

Esa regla significa que, cuando se diga `preparar todo`, no basta con tocar un archivo puntual.

Tambien hay que revisar:

- codigo relacionado
- comentarios
- nombres
- imports y exports
- rutas y controllers
- archivos `@...md`
- documentacion general
- seeds
- scripts

La idea es dejar cerrado el bloque completo.

## Como estamos organizando el trabajo

Ahora mismo el proyecto se esta construyendo por fases, por ejemplo:

1. servidor base
2. database y routers
3. PostgreSQL, Prisma y `.env`
4. JWT, login, logout y `generateToken`
5. seed files
6. watchlist, routes y controllers
7. middlewares
8. validaciones con Zod
9. movie controllers y rutas GET

Cada fase intenta dejar:

- codigo funcional
- nombres claros
- comentarios utiles
- documentacion actualizada
- commit propio

## Como estamos haciendo los commits

Los commits resumen bloques reales del proyecto.

Ejemplos de commits que ya se han usado:

```bash
JWT Authentication | Login | Logout | GenerateToken |Docs | .env.example | Hecho
feat: switch auth ids to uuid and document seeds
refactor: clean controllers, routers, and watchlist flow
feat: auth, uuid ids, watchlist, seeds, and docs
```

### Regla que estamos siguiendo

- si el bloque es mas tipo avance de clase o checkpoint, el mensaje puede ser mas descriptivo
- si el bloque es mas tecnico y claro, usamos `feat:` o `refactor:`
- el commit debe resumir el bloque completo, no solo un archivo

## Comandos de Git que estamos usando y vamos a necesitar

Aqui dejo los comandos de Git mas importantes para este proyecto.

### Ver estado de archivos

```bash
git status
```

Sirve para ver:

- que archivos han cambiado
- cuales estan sin preparar
- cuales estan preparados para commit
- en que rama estamos trabajando

### Ver cambios

```bash
git diff
```

Sirve para ver los cambios que aun no se han preparado con `git add`.

Si quieres ver los cambios ya preparados:

```bash
git diff --cached
```

### Preparar archivos para commit

```bash
git add .
```

Sirve para preparar todos los cambios actuales de la carpeta del proyecto.

Si quieres preparar solo archivos concretos:

```bash
git add ruta/del/archivo
```

### Crear un commit

```bash
git commit -m "mensaje del commit"
```

Sirve para guardar un bloque de trabajo en el historial del proyecto.

### Ver historial de commits

```bash
git log --oneline
```

Sirve para ver el historial resumido de commits.

### Ver la rama actual

```bash
git branch --show-current
```

Sirve para saber en que rama estas trabajando.

### Ver todas las ramas

```bash
git branch
```

Sirve para listar las ramas locales.

Si quieres ver tambien las remotas:

```bash
git branch -a
```

### Cambiar de rama

```bash
git switch nombre-de-la-rama
```

Sirve para moverte a otra rama ya existente.

### Crear una rama nueva y cambiarte a ella

```bash
git switch -c nombre-de-la-rama
```

Sirve para empezar una nueva fase de trabajo en una rama separada.

### Subir cambios a GitHub

```bash
git push
```

Sirve para subir tus commits al repositorio remoto.

La primera vez en una rama nueva normalmente se usa:

```bash
git push -u origin nombre-de-la-rama
```

### Traer cambios del remoto

```bash
git pull
```

Sirve para traer cambios de GitHub y fusionarlos con tu rama actual.

### Traer cambios sin fusionar todavia

```bash
git fetch
```

Sirve para descargar cambios del remoto sin mezclarlos automaticamente con tu rama local.

Es util cuando primero quieres revisar antes de hacer merge.

### Hacer merge de una rama

```bash
git merge nombre-de-la-rama
```

Sirve para unir en tu rama actual los cambios de otra rama.

Ejemplo:

```bash
git switch main
git merge 6-Watchlist-Routes-and-Controllers
```

### Ver el remoto configurado

```bash
git remote -v
```

Sirve para comprobar a que repositorio de GitHub esta conectado el proyecto.

### Restaurar cambios de un archivo antes del `add`

```bash
git restore ruta/del/archivo
```

Sirve para descartar cambios no preparados de un archivo concreto.

### Quitar un archivo del area preparada

```bash
git restore --staged ruta/del/archivo
```

Sirve para sacar un archivo del `git add` sin borrar sus cambios.

## Flujo basico que estamos siguiendo

Normalmente el flujo es:

```bash
git status
git add .
git commit -m "mensaje claro"
git push
```

Si estamos trabajando por ramas:

```bash
git switch -c nombre-de-la-rama
git add .
git commit -m "mensaje claro"
git push -u origin nombre-de-la-rama
```

## Commits recientes de este proyecto

Ejemplo del historial actual:

```text
9bc72db feat: auth, uuid ids, watchlist, seeds, and docs
878fc78 refactor: clean controllers, routers, and watchlist flow
2dc78cd feat: switch auth ids to uuid and document seeds
ef15773 JWT Authentication | Login | Logout | GenerateToken |Docs | .env.example | Hecho
65c1ba0 Crear Usuario Hecho bien
0eae12c Postgre SQL  Prisma Tablas  y DotEnv
06bf4ac Database & Routers | Hecho
aeb057f node js server Hecho
bd2778d first commit
```

## Como estamos usando las ramas

Estamos trabajando por ramas tematicas.

La rama actual es:

```text
8-Validations
```

### Idea de esta estructura

El nombre de la rama intenta decir:

- el numero o bloque del trabajo
- el tema principal que se esta desarrollando

Ejemplo:

```text
6-Watchlist-Routes-and-Controllers
```

Eso indica que esta rama se centra en:

- watchlist
- rutas
- controllers

## Estructura recomendada para las ramas

Podemos seguir una estructura parecida a esta:

```text
1-server-base
2-database-and-routers
3-postgresql-prisma-dotenv
4-register-user
5-jwt-authentication-controllers
6-watchlist-routes-controllers
7-auth-middleware
8-validations
9-movie-controllers-and-get
```

Lo importante es que el nombre:

- sea facil de leer
- diga que parte del proyecto toca
- ayude a entender el objetivo de la rama

## Que hacemos antes de cerrar una parte

Antes de hacer commit estamos intentando revisar:

- si los nombres de funciones y archivos tienen sentido
- si los imports estan bien
- si las rutas apuntan al controller correcto
- si los comentarios ayudan de verdad
- si los `@...md` internos estan actualizados
- si la documentacion general refleja el estado real del proyecto

## Que hacemos despues de cerrar una parte

Despues de cerrar una fase:

- dejamos commit
- el proyecto queda mas ordenado
- ya se puede empezar el siguiente bloque

## Siguiente punto del proyecto

La base de middleware ya esta creada.

Ahora el siguiente punto natural es seguir trabajando rutas privadas encima de esa base:

- probar login + token + watchlist
- decidir si el frontend enviara el token por header, cookie o ambos
- ampliar watchlist con mas endpoints si hace falta
