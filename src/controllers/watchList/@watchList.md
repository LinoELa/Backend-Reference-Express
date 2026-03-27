# @watchList

Esta subcarpeta agrupa los controllers del modulo de watchlist.

Aqui se coloca la logica relacionada con:

- listar la watchlist del usuario autenticado
- agregar peliculas a la watchlist
- eliminar peliculas de la watchlist
- validar que exista `movieId`
- usar `req.user.id` desde el middleware
- evitar duplicados en la watchlist
- guardar estado, rating y notas del item

En este proyecto actual, los controllers principales son:

- `getWatchListController`
- `addToWatchListController`
- `removeFromWatchListController`
- `updateWatchListController`

Los endpoints principales de este modulo son:

- `GET /watchlist`
- `POST /watchlist`
- `PUT /watchlist/:id`
- `DELETE /watchlist/:id`

La idea es separar esta logica de `auth` para que cada modulo tenga su propia responsabilidad.
