"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#celebracion", label: "Celebración" },
  { href: "#itinerario", label: "Itinerario" },
  { href: "#dresscode", label: "Dress code" },
  { href: "#regalos", label: "Regalos" },
  { href: "#hospedaje", label: "Hospedaje" },
  { href: "#rsvp", label: "Confirmar" },
];

const INICIO_PAGINA = 40;
const MOVIMIENTO_MINIMO = 6;

export default function Menu() {
  const [oculto, setOculto] = useState(false);
  const [solido, setSolido] = useState(false);

  useEffect(() => {
    let ultimaPosicion = window.scrollY;

    function alDesplazar() {
      const posicion = window.scrollY;
      setSolido(posicion > INICIO_PAGINA);

      if (posicion <= INICIO_PAGINA) {
        setOculto(false);
      } else if (Math.abs(posicion - ultimaPosicion) >= MOVIMIENTO_MINIMO) {
        setOculto(posicion > ultimaPosicion);
      } else {
        return;
      }
      ultimaPosicion = posicion;
    }

    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  const clases = ["menu", solido && "menu-solido", oculto && "menu-oculto"].filter(Boolean).join(" ");

  return (
    <nav className={clases} aria-label="Secciones de la invitación">
      <div className="menu-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}
