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
- `src/content/invitados.ts`: lista de invitados. Cada uno tiene su enlace `/?f=<slug>` con sus lugares.
- Confirmaciones: `src/app/api/rsvp/route.ts` las guarda en Neon (Postgres, variable `DATABASE_URL`); la tabla está en `db/schema.sql`.
- `/novios`: panel privado con confirmaciones y pendientes. La contraseña se define en `PANEL_PASSWORD`.
- `original/`: el HTML exportado original, como referencia.
