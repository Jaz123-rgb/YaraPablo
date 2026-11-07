import { NextResponse } from "next/server";
import { buscarConfirmacion, guardarConfirmacion } from "@/lib/confirmaciones";
import { buscarInvitado } from "@/lib/invitados";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const invitado = await buscarInvitado(typeof body?.slug === "string" ? body.slug : undefined);
  const asistencia = body?.asistencia;
  const asistentes = Number(body?.asistentes);
  const mensaje = typeof body?.mensaje === "string" ? body.mensaje.trim().slice(0, 1000) : "";

  if (!invitado || (asistencia !== "si" && asistencia !== "no")) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }
  if (asistencia === "si" && !(Number.isInteger(asistentes) && asistentes >= 1 && asistentes <= invitado.lugares)) {
    return NextResponse.json({ error: "Número de asistentes inválido" }, { status: 400 });
  }

  try {
    if (await buscarConfirmacion(invitado.slug)) {
      return NextResponse.json({ error: "Esta invitación ya respondió" }, { status: 409 });
    }
    await guardarConfirmacion({
      clave: invitado.slug,
      nombre: invitado.nombre,
      asistencia,
      asistentes: asistencia === "si" ? asistentes : 0,
      mensaje,
    });
  } catch (error) {
    console.error("[rsvp] no se pudo guardar", error);
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
