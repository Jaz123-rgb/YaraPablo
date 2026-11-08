import { db } from "@/lib/db";

export type Invitado = { nombre: string; slug: string; lugares: number };

export async function leerInvitados() {
  return (await db()`SELECT slug, nombre, lugares FROM invitados ORDER BY orden`) as Invitado[];
}

export async function buscarInvitado(slug?: string) {
  if (!slug) return null;
  const filas = await db()`SELECT slug, nombre, lugares FROM invitados WHERE slug = ${slug}`;
  return (filas[0] as Invitado | undefined) ?? null;
}

export async function actualizarInvitado(slug: string, nombre: string, lugares: number) {
  await db()`UPDATE invitados SET nombre = ${nombre}, lugares = ${lugares} WHERE slug = ${slug}`;
  await db()`UPDATE confirmaciones SET nombre = ${nombre} WHERE clave = ${slug}`;
}

/** Convierte "Familia Alcántara" en "familia-alcantara", el mismo formato de los enlaces existentes. */
function slugDe(nombre: string) {
  return nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "invitado";
}

/** Agrega una invitación al final de la lista. Si el enlace ya existe, le agrega un número. */
export async function crearInvitado(nombre: string, lugares: number) {
  const base = slugDe(nombre);
  for (let n = 1; n < 100; n++) {
    const slug = n === 1 ? base : `${base}-${n}`;
    const filas = await db()`
      INSERT INTO invitados (slug, nombre, lugares) VALUES (${slug}, ${nombre}, ${lugares})
      ON CONFLICT (slug) DO NOTHING RETURNING slug`;
    if (filas.length) return slug;
  }
  throw new Error("No se pudo crear un enlace único para esta invitación.");
}
