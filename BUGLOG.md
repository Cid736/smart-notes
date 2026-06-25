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
