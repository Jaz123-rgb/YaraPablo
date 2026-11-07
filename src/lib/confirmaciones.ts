import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export type Confirmacion = {
  nombre: string;
  asistencia: "si" | "no";
  asistentes: number;
  mensaje: string;
  fecha: string;
};

const archivo = path.join(process.cwd(), "data", "confirmaciones.jsonl");

export async function guardarConfirmacion(confirmacion: Confirmacion) {
  await mkdir(path.dirname(archivo), { recursive: true });
  await appendFile(archivo, JSON.stringify(confirmacion) + "\n", "utf-8");
}

const claveNombre = (nombre: string) =>
  nombre.normalize("NFD").replace(/\p{M}/gu, "").replace(/\s+/g, " ").trim().toLowerCase();

/** Devuelve la respuesta más reciente de cada persona, de la más nueva a la más antigua. */
export async function leerConfirmaciones(): Promise<Confirmacion[]> {
  const contenido = await readFile(archivo, "utf-8").catch((e: NodeJS.ErrnoException) => {
    if (e.code === "ENOENT") return "";
    throw e;
  });

  const porNombre = new Map<string, Confirmacion>();
  for (const linea of contenido.split("\n")) {
    if (!linea.trim()) continue;
    const confirmacion = JSON.parse(linea) as Confirmacion;
    porNombre.set(claveNombre(confirmacion.nombre), confirmacion);
  }
  return [...porNombre.values()].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
