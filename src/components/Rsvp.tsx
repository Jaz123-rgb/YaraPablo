"use client";

import { useState } from "react";
import { invitacion } from "@/content/invitacion";
import type { Confirmacion } from "@/lib/confirmaciones";
import type { Invitado } from "@/lib/invitados";
import { crearAudio, lanzarConfeti, sonarBuuu } from "@/lib/reaccionRsvp";

type Asistencia = "si" | "no" | null;

export default function Rsvp({ invitado, respuesta }: { invitado: Invitado | null; respuesta: Confirmacion | null }) {
  const [asistencia, setAsistencia] = useState<Asistencia>(null);
  const [asistentes, setAsistentes] = useState(String(invitado?.lugares ?? 1));
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const n = Number(asistentes) || 1;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!invitado) return;
    if (!asistencia) {
      setError("Por favor elige si nos acompañas.");
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
          slug: invitado.slug,
          asistencia,
          asistentes: asistencia === "si" ? n : 0,
          mensaje: mensaje.trim(),
        }),
      });
      if (res.status === 409) {
        void audio?.close();
        setError("Ya recibimos una respuesta de esta invitación. Recarga la página para verla.");
        return;
      }
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

  return (
    <section id="rsvp" className="section rsvp">
      <h2 className="script">Confirma tu asistencia</h2>
      <p className="body-text">
        Agradeceremos tu respuesta antes del {invitacion.fechaLimiteRsvp}.
      </p>
      {invitado && (
        <p className="rsvp-invitado serif">
          {invitado.nombre} · {invitado.lugares} {invitado.lugares === 1 ? "lugar reservado" : "lugares reservados"}
        </p>
      )}

      {!invitado ? (
        <p className="rsvp-sin-enlace">Para confirmar, usa el enlace personal que te enviamos.</p>
      ) : respuesta ? (
        <div role="status" className="rsvp-gracias">
          <p className="serif">Ya recibimos tu respuesta</p>
          <p>
            {respuesta.asistencia === "si"
              ? `Confirmaste tu asistencia para ${respuesta.asistentes} ${respuesta.asistentes === 1 ? "persona" : "personas"}. ¡Nos vemos en la fiesta!`
              : "Nos avisaste que no podrás acompañarnos. Te llevaremos en el corazón ese día."}
          </p>
          {respuesta.mensaje && <p>Tu mensaje: {respuesta.mensaje}</p>}
          <p className="rsvp-nota">Si necesitas cambiar tu respuesta, avísanos.</p>
        </div>
      ) : enviado ? (
        <div role="status" className="rsvp-gracias">
          <p className="serif">¡Gracias!</p>
          <p>
            {asistencia === "si"
              ? `Recibimos tu confirmación para ${n} ${n === 1 ? "persona" : "personas"}. ¡Nos vemos en la fiesta!`
              : "Lamentamos que no puedas acompañarnos. Gracias por avisarnos, te llevaremos en el corazón ese día."}
          </p>
        </div>
      ) : (
        <form className="rsvp-form" onSubmit={enviar} noValidate>
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
                {Array.from({ length: invitado.lugares }, (_, i) => i + 1).map((v) => (
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
