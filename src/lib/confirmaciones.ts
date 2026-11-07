import { db } from "@/lib/db";

export type Confirmacion = {
  clave: string;
  nombre: string;
  asistencia: "si" | "no";
  asistentes: number;
  mensaje: string;
  fecha: string;
};

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

export async function buscarConfirmacion(clave: string) {
  const filas = await db()`
    SELECT clave, nombre, asistencia, asistentes, mensaje, fecha
    FROM confirmaciones
    WHERE clave = ${clave}
  `;
  return (filas[0] as Confirmacion | undefined) ?? null;
}

export async function borrarConfirmacion(clave: string) {
  await db()`DELETE FROM confirmaciones WHERE clave = ${clave}`;
}
