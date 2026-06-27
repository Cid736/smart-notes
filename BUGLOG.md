# Bug Log — smart-notes

## 2026-06-25 — Revisión 1

### [LOW] Sin límite de tamaño en el contenido de las notas
- **Fix:** Añadido límite de 500 KB en POST y PUT.

---

## 2026-06-25 — Revisión 2

### [MEDIUM] Sin autenticación en ningún endpoint
- **Archivo:** `server.js`
- **Fix:** Añadida protección por API key (`X-Api-Key` header). Si la variable de entorno `API_KEY` está configurada, todas las rutas `/api/notes` la requieren.

### [LOW] Sin rate limiting en `/summarize`
- **Archivo:** `routes/notes.js`
- **Fix:** Añadido rate limiter de 10 peticiones/minuto por IP en `POST /:id/summarize`.

---

## 2026-06-25 — Revisión 3

### [LOW] Rate limiter de `/summarize` ignoraba `X-Forwarded-For`
- **Archivo:** `routes/notes.js` línea 42
- **Fix:** IP ahora obtenida de `X-Forwarded-For` (primer hop), `X-Real-IP` o `socket.remoteAddress`, en ese orden.

---

## 2026-06-28 — Revisión 4

### [HIGH] Bypass de autenticación en el frontend
- **Archivo:** `public/index.html` — función `api()`
- **Descripción:** La función `api()` del cliente nunca incluía la cabecera `X-Api-Key`. Aunque el servidor requería la cabecera para `/api/notes`, todas las peticiones del navegador llegaban sin ella y recibían 401. En la práctica el frontend era completamente inutilizable con autenticación activa, y un atacante que descubriera esto podría confundirse para pensar que no hay auth cuando sí la hay.
- **Fix:** `server.js` ahora sirve `index.html` dinámicamente inyectando `<meta name="x-api-key" content="...">` con el valor de `API_KEY` del entorno. El cliente JS lee este meta-tag en `_apiKey` y lo incluye en cada petición. Añadido handler de error 401 en el cliente.

### [LOW] Ruta de `notes.db` dependiente del CWD
- **Archivo:** `db.js` línea 2
- **Descripción:** `new Database('notes.db')` usaba una ruta relativa al directorio de trabajo actual del proceso. Si la app se iniciaba desde un directorio diferente (ej. con `node /ruta/a/server.js` desde otro dir), la base de datos se creaba o buscaba en el lugar incorrecto.
- **Fix:** Cambiado a `path.join(__dirname, 'notes.db')` para que la ruta sea siempre relativa al archivo `db.js`.

### [LOW] Consulta de búsqueda sin límite de longitud
- **Archivo:** `routes/notes.js` — endpoint `GET /`
- **Descripción:** El parámetro `?q=` no tenía límite de longitud. Una query muy larga podía causar un escaneo LIKE costoso en SQLite con muchas notas.
- **Fix:** Queries superiores a 200 caracteres son rechazadas con HTTP 400 antes de llegar a la base de datos.
