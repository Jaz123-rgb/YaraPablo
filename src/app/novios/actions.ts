"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { borrarConfirmacion, buscarConfirmacion, guardarConfirmacion } from "@/lib/confirmaciones";
import { actualizarInvitado, buscarInvitado } from "@/lib/invitados";
import { COOKIE_PANEL, passwordCorrecta, sesionValida, tokenSesion } from "@/lib/panelAuth";

export async function entrar(formData: FormData) {
  const intento = formData.get("password");
  const token = tokenSesion();
  if (typeof intento !== "string" || !token || !passwordCorrecta(intento)) {
    redirect("/novios?error=1");
  }
  (await cookies()).set(COOKIE_PANEL, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/novios",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/novios");
}

export async function salir() {
  (await cookies()).delete({ name: COOKIE_PANEL, path: "/novios" });
  redirect("/novios");
}

const entero = (valor: FormDataEntryValue | null) => Number(valor);

export async function guardarInvitado(datos: FormData): Promise<{ error?: string }> {
  // Las acciones del servidor se pueden llamar directamente, así que la sesión se valida aquí.
  if (!sesionValida((await cookies()).get(COOKIE_PANEL)?.value)) {
    return { error: "Tu sesión terminó. Vuelve a entrar al panel." };
  }

  const slug = String(datos.get("slug") ?? "");
  const nombre = String(datos.get("nombre") ?? "").trim().slice(0, 120);
  const lugares = entero(datos.get("lugares"));
  const estado = datos.get("estado");
  const asistentes = estado === "si" ? entero(datos.get("asistentes")) : 0;

  if (!(await buscarInvitado(slug))) return { error: "No encontramos esta invitación." };
  if (!nombre) return { error: "Escribe un nombre." };
  if (!Number.isInteger(lugares) || lugares < 1 || lugares > 99) return { error: "Los lugares deben ser entre 1 y 99." };
  if (estado !== "si" && estado !== "no" && estado !== "pendiente") return { error: "Elige una respuesta." };
  if (estado === "si" && (!Number.isInteger(asistentes) || asistentes < 1 || asistentes > lugares)) {
    return { error: `Las personas deben ser entre 1 y ${lugares}.` };
  }

  const actual = await buscarConfirmacion(slug);
  await actualizarInvitado(slug, nombre, lugares);

  if (estado === "pendiente") {
    if (actual) await borrarConfirmacion(slug);
  } else if (actual?.asistencia !== estado || actual.asistentes !== asistentes) {
    await guardarConfirmacion({ clave: slug, nombre, asistencia: estado, asistentes, mensaje: actual?.mensaje ?? "" });
  }

  revalidatePath("/novios");
  return {};
}
