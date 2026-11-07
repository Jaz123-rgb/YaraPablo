"use client";

import { useState } from "react";
import { invitacion } from "@/content/invitacion";
import { crearAudio, lanzarConfeti, sonarBuuu } from "@/lib/reaccionRsvp";

type Asistencia = "si" | "no" | null;

export default function Rsvp() {
  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState<Asistencia>(null);
  const [asistentes, setAsistentes] = useState("1");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !asistencia) {
      setError("Por favor escribe tu nombre y elige si nos acompañas.");
      return;
    }
    setEnviando(true);
    setError(null);
    const audio = asistencia === "no" ? crearAudio() : null;
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          asistencia,
          asistentes: asistencia === "si" ? Number(asistentes) : 0,
          mensaje: mensaje.trim(),
        }),
      });
      if (!res.ok) throw new Error();
      setEnviado(true);
      if (asistencia === "si") void lanzarConfeti();
      else if (audio) sonarBuuu(audio);
    } catch {
      void audio?.close();
      setError("No pudimos enviar tu confirmación. Intenta de nuevo en un momento.");
    } finally {
      setEnviando(false);
    }
  }

  const n = Number(asistentes) || 1;
  const primerNombre = nombre.trim().split(" ")[0];

  return (
    <section id="rsvp" className="section rsvp">
      <h2 className="script">Confirma tu asistencia</h2>
      <p className="body-text">
        Agradeceremos tu respuesta antes del {invitacion.fechaLimiteRsvp}.
      </p>

      {enviado ? (
        <div role="status" className="rsvp-gracias">
          <p className="serif">¡Gracias, {primerNombre}!</p>
          <p>
            {asistencia === "si"
              ? `Recibimos tu confirmación para ${n} ${n === 1 ? "persona" : "personas"}. ¡Nos vemos en la fiesta!`
              : "Lamentamos que no puedas acompañarnos. Gracias por avisarnos, te llevaremos en el corazón ese día."}
          </p>
        </div>
      ) : (
        <form className="rsvp-form" onSubmit={enviar} noValidate>
          <div className="rsvp-campo">
            <label htmlFor="rsvp-nombre">Nombre completo</label>
            <input
              id="rsvp-nombre"
              type="text"
              className="rsvp-input"
              placeholder="Como aparece en tu invitación"
              value={nombre}
              onChange={(e) => { setNombre(e.target.value); setError(null); }}
            />
          </div>

          <fieldset className="rsvp-campo">
            <legend>¿Nos acompañas?</legend>
            <div className="rsvp-opciones">
              <button
                type="button"
                className="rsvp-opcion"
                aria-pressed={asistencia === "si"}
                onClick={() => { setAsistencia("si"); setError(null); }}
              >
                Con gusto asistiré
              </button>
              <button
                type="button"
                className="rsvp-opcion"
                aria-pressed={asistencia === "no"}
                onClick={() => { setAsistencia("no"); setError(null); }}
              >
                No podré asistir
              </button>
            </div>
          </fieldset>

          {asistencia !== "no" && (
            <div className="rsvp-campo">
              <label htmlFor="rsvp-pases">Número de asistentes</label>
              <select
                id="rsvp-pases"
                className="rsvp-input"
                value={asistentes}
                onChange={(e) => setAsistentes(e.target.value)}
              >
                {Array.from({ length: invitacion.maxAsistentes }, (_, i) => i + 1).map((v) => (
                  <option key={v} value={v}>{v} {v === 1 ? "persona" : "personas"}</option>
                ))}
              </select>
            </div>
          )}

          <div className="rsvp-campo">
            <label htmlFor="rsvp-mensaje">Mensaje para los novios (opcional)</label>
            <textarea
              id="rsvp-mensaje"
              rows={4}
              className="rsvp-input"
              placeholder="Restricciones alimentarias, canciones que no pueden faltar…"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>

          {error && <p role="alert" className="rsvp-error">{error}</p>}

          <button type="submit" className="rsvp-enviar" disabled={enviando}>
            {enviando ? "Enviando…" : "Enviar confirmación"}
          </button>
        </form>
      )}
    </section>
  );
}
