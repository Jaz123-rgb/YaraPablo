"use client";

import { useState } from "react";

export default function CopiarClabe({ clabe }: { clabe: string }) {
  const [copiada, setCopiada] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(clabe);
      setCopiada(true);
      setTimeout(() => setCopiada(false), 2500);
    } catch {
      // Sin acceso al portapapeles: la CLABE se puede seleccionar a mano.
    }
  }

  return (
    <button type="button" onClick={copiar} className="btn sobre-copiar" aria-live="polite">
      {copiada ? "¡CLABE copiada!" : "Copiar CLABE"}
    </button>
  );
}
