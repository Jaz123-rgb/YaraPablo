"use client";

import { useEffect, useRef, useState } from "react";
import { invitacion } from "@/content/invitacion";

const { youtubeId, titulo } = invitacion.cancion;
const ESPERA_REPRODUCCION = 5000;
const REPRODUCIENDO = 1;
const URL_REPRODUCTOR = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&enablejsapi=1&loop=1&playlist=${youtubeId}&playsinline=1&rel=0`;

export default function Musica() {
  const reproductor = useRef<HTMLIFrameElement>(null);
  const segundoActual = useRef(0);
  const [iniciada, setIniciada] = useState(false);
  const [sonando, setSonando] = useState(false);
  const [necesitaToque, setNecesitaToque] = useState(false);

  // Algunos navegadores, como Safari en iPhone, bloquean el inicio automático. Si la música no
  // arranca, se muestra el reproductor para que el invitado pueda tocarlo directamente.
  useEffect(() => {
    if (!sonando) {
      setNecesitaToque(false);
      return;
    }

    const espera = setTimeout(() => setNecesitaToque(true), ESPERA_REPRODUCCION);

    function alRecibirMensaje(e: MessageEvent) {
      if (e.source !== reproductor.current?.contentWindow || typeof e.data !== "string") return;
      try {
        const { info } = JSON.parse(e.data);
        if (typeof info?.currentTime === "number") segundoActual.current = info.currentTime;
        if (info?.playerState === REPRODUCIENDO) {
          clearTimeout(espera);
          setNecesitaToque(false);
        }
      } catch {
        // Mensaje que no es del reproductor.
      }
    }

    window.addEventListener("message", alRecibirMensaje);
    return () => {
      clearTimeout(espera);
      window.removeEventListener("message", alRecibirMensaje);
    };
  }, [sonando]);

  function hablarConReproductor(mensaje: object) {
    reproductor.current?.contentWindow?.postMessage(JSON.stringify(mensaje), "*");
  }

  function escucharReproductor() {
    hablarConReproductor({ event: "listening", id: 1, channel: "widget" });
  }

  function enviar(func: string, args: unknown[] = []) {
    hablarConReproductor({ event: "command", func, args });
  }

  function alternar() {
    if (iniciada) {
      if (sonando) {
        enviar("pauseVideo");
      } else {
        // Vuelve al segundo guardado por si el navegador reinició la canción durante la pausa.
        enviar("seekTo", [segundoActual.current, true]);
        enviar("playVideo");
      }
    }
    setIniciada(true);
    setSonando(!sonando);
  }

  return (
    <div className="musica">
      {iniciada && (
        <iframe
          ref={reproductor}
          className={necesitaToque ? "musica-video musica-video-visible" : "musica-video"}
          onLoad={escucharReproductor}
          src={URL_REPRODUCTOR}
          title={`Reproductor de YouTube: ${titulo}`}
          allow="autoplay; encrypted-media"
        />
      )}
      <button
        type="button"
        className="musica-boton"
        onClick={alternar}
        aria-pressed={sonando}
        aria-label={sonando ? "Pausar música" : "Reproducir música"}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          {sonando ? (
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
          ) : (
            <path d="M19 3v12.5a3.5 3.5 0 1 1-2-3.16V7.6L9 9.4v8.1a3.5 3.5 0 1 1-2-3.16V5z" />
          )}
        </svg>
      </button>
    </div>
  );
}
