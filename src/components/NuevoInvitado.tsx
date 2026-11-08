"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { agregarInvitado } from "@/app/novios/actions";
import CopiarEnlace from "@/components/CopiarEnlace";

function BotonAgregar() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="panel-copiar panel-guardar" disabled={pending}>
      {pending ? "Agregando…" : "Agregar"}
    </button>
  );
}

export default function NuevoInvitado() {
  const formulario = useRef<HTMLFormElement>(null);
  const [abierto, setAbierto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agregado, setAgregado] = useState<{ nombre: string; slug: string } | null>(null);

  async function agregar(datos: FormData) {
    const resultado = await agregarInvitado(datos);
    if (resultado.error || !resultado.slug) {
      setError(resultado.error ?? "No se pudo agregar. Intenta de nuevo.");
      return;
    }
    setError(null);
    setAgregado({ nombre: String(datos.get("nombre")).trim(), slug: resultado.slug });
    formulario.current?.reset();
  }

  if (!abierto) {
    return (
      <div className="panel-nuevo">
        <button type="button" className="panel-copiar" onClick={() => setAbierto(true)}>
          + Agregar invitación
        </button>
      </div>
    );
  }

  return (
    <div className="panel-nuevo">
      <form ref={formulario} action={agregar} className="panel-edicion">
        <label>
          Nombre
          <input name="nombre" maxLength={120} placeholder="Familia Pérez" required autoFocus />
        </label>
        <label>
          Lugares
          <input name="lugares" type="number" min={1} max={99} defaultValue={2} required />
        </label>
        <div className="panel-edicion-botones">
          <BotonAgregar />
          <button
            type="button"
            className="panel-copiar"
            onClick={() => {
              setAbierto(false);
              setError(null);
              setAgregado(null);
            }}
          >
            Cerrar
          </button>
        </div>
        {error && <p role="alert" className="panel-edicion-error">{error}</p>}
      </form>
      {agregado && (
        <p className="panel-nuevo-listo" role="status">
          Se agregó <strong>{agregado.nombre}</strong>. Su enlace: <CopiarEnlace slug={agregado.slug} />
        </p>
      )}
    </div>
  );
}
