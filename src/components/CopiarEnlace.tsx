"use client";

import { useState } from "react";

export default function CopiarEnlace({ slug }: { slug: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/?f=${slug}`);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sin acceso al portapapeles: el enlace se puede abrir y copiar desde el navegador.
    }
  }

  return (
    <span className="panel-enlace">
      <button type="button" onClick={copiar} className="panel-copiar" aria-live="polite">
        {copiado ? "¡Copiado!" : "Copiar"}
      </button>
      <a href={`/?f=${slug}`} target="_blank" rel="noopener noreferrer">Abrir</a>
    </span>
  );
}
