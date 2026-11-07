import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { invitacion } from "@/content/invitacion";
import { invitados } from "@/content/invitados";
import { leerConfirmaciones } from "@/lib/confirmaciones";
import { COOKIE_PANEL, sesionValida } from "@/lib/panelAuth";
import { entrar, salir } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Confirmaciones · Pablo & Yara",
  robots: { index: false, follow: false },
};

const filtros = [
  { id: "todos", etiqueta: "Todos" },
  { id: "si", etiqueta: "Asisten" },
  { id: "no", etiqueta: "No asisten" },
  { id: "pendiente", etiqueta: "Pendientes" },
];

const etiquetasEstado: Record<string, string> = { si: "Asiste", no: "No asiste", pendiente: "Pendiente" };

const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Mexico_City",
});

export default async function PanelNovios({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; filtro?: string }>;
}) {
  const { error, filtro = "todos" } = await searchParams;
  const sesion = (await cookies()).get(COOKIE_PANEL)?.value;

  if (!sesionValida(sesion)) {
    return (
      <main className="panel-login dark">
        <p className="eyebrow">Solo para los novios</p>
        <h1 className="script">{invitacion.novios}</h1>
        <form action={entrar} className="panel-login-form">
          <label htmlFor="panel-password">Contraseña</label>
          <input id="panel-password" name="password" type="password" autoComplete="current-password" required />
          {error && <p role="alert" className="panel-login-error">Contraseña incorrecta. Intenta de nuevo.</p>}
          <button type="submit" className="btn btn-solid-light">Entrar</button>
        </form>
      </main>
    );
  }

  const confirmaciones = await leerConfirmaciones();
  const respondieron = new Set(confirmaciones.map((c) => c.clave));
  const asisten = confirmaciones.filter((c) => c.asistencia === "si");
  const noAsisten = confirmaciones.length - asisten.length;
  const personas = asisten.reduce((total, c) => total + c.asistentes, 0);
  const lugares = invitados.reduce((total, i) => total + i.lugares, 0);

  const filas = [
    ...confirmaciones.map((c) => ({
      ...c,
      estado: c.asistencia as string,
      lugares: invitados.find((i) => i.slug === c.clave)?.lugares,
    })),
    ...invitados
      .filter((i) => !respondieron.has(i.slug))
      .map((i) => ({ clave: i.slug, nombre: i.nombre, estado: "pendiente", asistentes: 0, lugares: i.lugares, mensaje: "", fecha: "" })),
  ];
  const visibles = filas.filter((f) => filtro === "todos" || f.estado === filtro);
  const pendientes = filas.filter((f) => f.estado === "pendiente").length;

  const resumen = [
    { valor: `${personas}/${lugares}`, etiqueta: "Personas confirmadas" },
    { valor: asisten.length, etiqueta: "Invitaciones: asisten" },
    { valor: noAsisten, etiqueta: "Invitaciones: no asisten" },
    { valor: pendientes, etiqueta: "Invitaciones pendientes" },
  ];

  return (
    <main className="panel">
      <header className="panel-cabecera dark">
        <div className="panel-ancho panel-titulo">
          <div>
            <p className="eyebrow">Confirmaciones · límite {invitacion.fechaLimiteRsvp}</p>
            <h1 className="script">{invitacion.novios}</h1>
          </div>
          <form action={salir}>
            <button type="submit" className="btn btn-outline-light">Salir</button>
          </form>
        </div>
        <div className="panel-ancho panel-resumen">
          {resumen.map((r) => (
            <div key={r.etiqueta} className="panel-dato">
              <span className="panel-numero serif">{r.valor}</span>
              <span className="panel-etiqueta">{r.etiqueta}</span>
            </div>
          ))}
        </div>
      </header>

      <section className="panel-ancho panel-lista">
        <nav className="panel-filtros" aria-label="Filtrar confirmaciones">
          {filtros.map((f) => (
            <Link
              key={f.id}
              href={f.id === "todos" ? "/novios" : `/novios?filtro=${f.id}`}
              aria-current={filtro === f.id ? "page" : undefined}
            >
              {f.etiqueta}
            </Link>
          ))}
        </nav>

        {visibles.length === 0 ? (
          <p className="panel-vacio">Todavía no hay respuestas aquí.</p>
        ) : (
          <div className="panel-tabla-marco">
            <table className="panel-tabla">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Respuesta</th>
                  <th scope="col">Personas</th>
                  <th scope="col">Mensaje</th>
                  <th scope="col">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((f) => (
                  <tr key={f.clave}>
                    <td className="serif panel-nombre">{f.nombre}</td>
                    <td>
                      <span className={`panel-estado panel-estado-${f.estado}`}>{etiquetasEstado[f.estado]}</span>
                    </td>
                    <td data-etiqueta="Personas">
                      {f.estado === "si" ? f.asistentes : "—"}
                      {f.lugares ? ` de ${f.lugares}` : ""}
                    </td>
                    <td className="panel-mensaje">{f.mensaje || "—"}</td>
                    <td className="panel-fecha">{f.fecha ? formatoFecha.format(new Date(f.fecha)) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
