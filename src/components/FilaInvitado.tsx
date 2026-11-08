"use client";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { borrarInvitado, guardarInvitado } from "@/app/novios/actions";
import CopiarEnlace from "@/components/CopiarEnlace";

export type FilaPanel = {
  slug: string;
  nombre: string;
  lugares: number;
  estado: string;
  asistentes: number;
  mensaje: string;
  fecha: string;
};

const etiquetasEstado: Record<string, string> = { si: "Asiste", no: "No asiste", pendiente: "Pendiente" };

function BotonGuardar() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="panel-copiar panel-guardar" disabled={pending}>
      {pending ? "Guardando…" : "Guardar"}
    </button>
  );
}

export default function FilaInvitado({ fila }: { fila: FilaPanel }) {
  const [editando, setEditando] = useState(false);
  const [estado, setEstado] = useState(fila.estado);
  const [error, setError] = useState<string | null>(null);
  const [borrando, iniciarBorrado] = useTransition();

  function borrar() {
    const aviso = `¿Borrar a "${fila.nombre}"? Se borrará también su respuesta y su enlace dejará de funcionar. Esto no se puede deshacer.`;
    if (!window.confirm(aviso)) return;
    setError(null);
    iniciarBorrado(async () => {
      const resultado = await borrarInvitado(fila.slug);
      if (resultado.error) setError(resultado.error);
    });
  }

  function editar() {
    setEstado(fila.estado);
    setError(null);
    setEditando(true);
  }

  async function guardar(datos: FormData) {
    const resultado = await guardarInvitado(datos);
    if (resultado.error) setError(resultado.error);
    else setEditando(false);
  }

  if (editando) {
    return (
      <tr>
        <td colSpan={6}>
          <form action={guardar} className="panel-edicion">
            <input type="hidden" name="slug" value={fila.slug} />
            <label>
              Nombre
              <input name="nombre" defaultValue={fila.nombre} maxLength={120} required />
            </label>
            <label>
              Lugares
              <input name="lugares" type="number" min={1} max={99} defaultValue={fila.lugares} required />
            </label>
            <label>
              Respuesta
              <select name="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="si">Asiste</option>
                <option value="no">No asiste</option>
              </select>
            </label>
            {estado === "si" && (
              <label>
                Personas
                <input name="asistentes" type="number" min={1} max={99} defaultValue={fila.asistentes || fila.lugares} required />
              </label>
            )}
            <div className="panel-edicion-botones">
              <BotonGuardar />
              <button type="button" className="panel-copiar" onClick={() => setEditando(false)}>Cancelar</button>
            </div>
            {error && <p role="alert" className="panel-edicion-error">{error}</p>}
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="serif panel-nombre">{fila.nombre}</td>
      <td>
        <span className={`panel-estado panel-estado-${fila.estado}`}>{etiquetasEstado[fila.estado]}</span>
      </td>
      <td data-etiqueta="Personas">{fila.estado === "si" ? fila.asistentes : "—"} de {fila.lugares}</td>
      <td className="panel-mensaje">{fila.mensaje || "—"}</td>
      <td className="panel-fecha">{fila.fecha || "—"}</td>
      <td>
        <span className="panel-enlace">
          <button type="button" className="panel-copiar" onClick={editar}>Editar</button>
          <CopiarEnlace slug={fila.slug} />
          <button type="button" className="panel-copiar panel-borrar" onClick={borrar} disabled={borrando}>
            {borrando ? "Borrando…" : "Borrar"}
          </button>
        </span>
        {error && <p role="alert" className="panel-edicion-error">{error}</p>}
      </td>
    </tr>
  );
}
