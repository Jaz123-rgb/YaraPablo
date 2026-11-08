"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo-ja.png";
import { invitacion } from "@/content/invitacion";

const { youtubeId, titulo } = invitacion.cancion;
// Si la música no arranca en este tiempo (por ejemplo, Safari en iPhone la bloquea), la invitación
// se abre de todos modos y el botón de música queda disponible.
const ESPERA_REPRODUCCION = 6000;
const DURACION_SALIDA = 700;
const REPRODUCIENDO = 1;
const URL_REPRODUCTOR = `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&loop=1&playlist=${youtubeId}&playsinline=1&rel=0`;

type Bienvenida = "esperando" | "cargando" | "saliendo" | "cerrada";

export default function Musica({ invitado }: { invitado?: string }) {
  const reproductor = useRef<HTMLIFrameElement>(null);
  const segundoActual = useRef(0);
  // El reproductor se carga desde que se abre la página para que la música arranque en cuanto
  // el invitado abra la invitación, sin esperar a que YouTube termine de cargar.
  const listo = useRef(false);
  const quiereSonar = useRef(false);
  const [sonando, setSonando] = useState(false);
  const [bienvenida, setBienvenida] = useState<Bienvenida>("esperando");

  useEffect(() => {
    function alRecibirMensaje(e: MessageEvent) {
      if (e.source !== reproductor.current?.contentWindow || typeof e.data !== "string") return;
      try {
        const { event, info } = JSON.parse(e.data);
        if (event === "onReady") {
          listo.current = true;
          // Si el invitado abrió la invitación antes de que YouTube estuviera listo, arranca ahora.
          if (quiereSonar.current) enviar("playVideo");
        }
        if (typeof info?.currentTime === "number") segundoActual.current = info.currentTime;
        if (info?.playerState === REPRODUCIENDO) {
          setSonando(true);
          setBienvenida((b) => (b === "cargando" ? "saliendo" : b));
        }
      } catch {
        // Mensaje que no es del reproductor.
      }
    }

    window.addEventListener("message", alRecibirMensaje);
    return () => window.removeEventListener("message", alRecibirMensaje);
  }, []);

  // Mientras se ve la bienvenida, la página de atrás no se puede desplazar.
  useEffect(() => {
    if (bienvenida === "cerrada") return;
    const raiz = document.documentElement;
    raiz.style.overflow = "hidden";
    return () => {
      raiz.style.overflow = "";
    };
  }, [bienvenida]);

  useEffect(() => {
    if (bienvenida === "cargando") {
      const espera = setTimeout(() => {
        quiereSonar.current = false;
        if (listo.current) enviar("pauseVideo");
        setBienvenida("saliendo");
      }, ESPERA_REPRODUCCION);
      return () => clearTimeout(espera);
    }
    if (bienvenida === "saliendo") {
      const salida = setTimeout(() => setBienvenida("cerrada"), DURACION_SALIDA);
      return () => clearTimeout(salida);
    }
  }, [bienvenida]);

  function hablarConReproductor(mensaje: object) {
    reproductor.current?.contentWindow?.postMessage(JSON.stringify(mensaje), "*");
  }

  function escucharReproductor() {
    hablarConReproductor({ event: "listening", id: 1, channel: "widget" });
  }

  function enviar(func: string, args: unknown[] = []) {
    hablarConReproductor({ event: "command", func, args });
  }

  function reproducir() {
    quiereSonar.current = true;
    if (!listo.current) return;
    // Vuelve al segundo guardado por si el navegador reinició la canción durante la pausa.
    if (segundoActual.current > 0) enviar("seekTo", [segundoActual.current, true]);
    enviar("playVideo");
  }

  function abrirInvitacion() {
    setBienvenida("cargando");
    reproducir();
  }

  function alternar() {
    if (sonando) {
      quiereSonar.current = false;
      if (listo.current) enviar("pauseVideo");
      setSonando(false);
    } else {
      reproducir();
      setSonando(true);
    }
  }

  return (
    <>
      {bienvenida !== "cerrada" && (
        <div
          className={bienvenida === "saliendo" ? "bienvenida bienvenida-saliendo" : "bienvenida"}
          role="dialog"
          aria-modal="true"
          aria-label="Bienvenida"
        >
          <Image src={logo} alt={invitacion.novios} priority sizes="200px" className="bienvenida-logo" />
          {invitado && (
            <div className="bienvenida-invitado">
              <p className="eyebrow">Invitación especial para</p>
              <p className="bienvenida-nombre serif">{invitado}</p>
            </div>
          )}
          {bienvenida === "esperando" ? (
            <button type="button" className="btn btn-outline-light bienvenida-boton" onClick={abrirInvitacion}>
              Abrir invitación
            </button>
          ) : (
            <div className="bienvenida-cargando" role="status">
              <span className="bienvenida-puntos" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span>Preparando la música…</span>
            </div>
          )}
        </div>
      )}

      <div className="musica">
        <iframe
          ref={reproductor}
          className="musica-video"
          onLoad={escucharReproductor}
          src={URL_REPRODUCTOR}
          title={`Reproductor de YouTube: ${titulo}`}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden="true"
        />
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
    </>
  );
}
