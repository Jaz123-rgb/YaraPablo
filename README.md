# Invitación Pablo & Yara

Next.js (App Router) + TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # compilación de producción
```

- `src/content/invitacion.ts`: textos, fechas, lugares y enlaces. Los valores entre `[corchetes]` faltan por llenar.
- `src/components/`: una sección de la invitación por archivo; el orden se define en `src/app/page.tsx`.
- `src/app/globals.css`: colores y estilos.
- `src/app/api/rsvp/route.ts`: recibe las confirmaciones y las guarda en `data/confirmaciones.jsonl`. Ese archivo necesita un disco persistente: no sobrevive en hosting serverless.
- `/novios`: panel privado de confirmaciones. La contraseña se define en `PANEL_PASSWORD` (`.env.local`); sin ella nadie puede entrar.
- `original/`: el HTML exportado original, como referencia.
