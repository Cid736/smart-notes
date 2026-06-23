# Smart Notes

Aplicacion de notas con resumen automatico por IA — sin APIs externas, funciona 100% en local.

## Stack
Node.js · Express · SQLite · Vanilla JS

## Funcionalidades
- Crear, editar y eliminar notas
- Busqueda en tiempo real
- Resumen automatico de cualquier nota (NLP extractivo, sin API key)
- Extrae puntos clave y sugiere etiquetas automaticamente
- Haz clic en las etiquetas sugeridas para añadirlas a la nota
- Interfaz oscura limpia

## Instalacion
```bash
npm install
npm start
# Abre http://localhost:3001
```

## Como funciona la IA
Usa puntuacion de frases estilo TF-IDF para clasificar y extraer las frases mas relevantes de la nota — sin servicio externo, sin API key, sin coste.
