import { neon } from "@neondatabase/serverless";

export type Confirmacion = {
  clave: string;
  nombre: string;
  asistencia: "si" | "no";
  asistentes: number;
  mensaje: string;
  fecha: string;
};

const db = () => neon(process.env.DATABASE_URL as string);

/** Guarda la respuesta; si esa invitación ya había respondido, la reemplaza. */
export async function guardarConfirmacion(c: Omit<Confirmacion, "fecha">) {
  await db()`
    INSERT INTO confirmaciones (clave, nombre, asistencia, asistentes, mensaje)
    VALUES (${c.clave}, ${c.nombre}, ${c.asistencia}, ${c.asistentes}, ${c.mensaje})
    ON CONFLICT (clave) DO UPDATE SET
      nombre = EXCLUDED.nombre,
      asistencia = EXCLUDED.asistencia,
      asistentes = EXCLUDED.asistentes,
      mensaje = EXCLUDED.mensaje,
      fecha = now()
  `;
}

export async function leerConfirmaciones(): Promise<Confirmacion[]> {
  const filas = await db()`
    SELECT clave, nombre, asistencia, asistentes, mensaje, fecha
    FROM confirmaciones
    ORDER BY fecha DESC
  `;
  return filas.map((f) => ({ ...f, fecha: new Date(f.fecha).toISOString() }) as Confirmacion);
}
