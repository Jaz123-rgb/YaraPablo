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
- `src/app/api/rsvp/route.ts`: recibe las confirmaciones. **Todavía no las guarda**, solo las escribe en la consola del servidor.
- `original/`: el HTML exportado original, como referencia.
