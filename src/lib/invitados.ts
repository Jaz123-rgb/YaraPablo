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
