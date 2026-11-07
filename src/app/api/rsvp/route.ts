import { NextResponse } from "next/server";
import { invitacion } from "@/content/invitacion";

export type Confirmacion = {
  nombre: string;
  asistencia: "si" | "no";
  asistentes: number;
  mensaje: string;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const nombre = typeof body?.nombre === "string" ? body.nombre.trim().slice(0, 120) : "";
  const asistencia = body?.asistencia;
  const asistentes = Number(body?.asistentes);
  const mensaje = typeof body?.mensaje === "string" ? body.mensaje.trim().slice(0, 1000) : "";

  if (!nombre || (asistencia !== "si" && asistencia !== "no")) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }
  if (asistencia === "si" && !(asistentes >= 1 && asistentes <= invitacion.maxAsistentes)) {
    return NextResponse.json({ error: "Número de asistentes inválido" }, { status: 400 });
  }

  const confirmacion: Confirmacion = {
    nombre,
    asistencia,
    asistentes: asistencia === "si" ? asistentes : 0,
    mensaje,
  };

  // TODO: guardar la confirmación (base de datos, Google Sheets, correo, etc.).
  // Por ahora solo se registra en la consola del servidor.
  console.log("[rsvp]", new Date().toISOString(), confirmacion);

  return NextResponse.json({ ok: true });
}
