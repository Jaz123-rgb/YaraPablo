import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { invitacion } from "@/content/invitacion";
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
];

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
  const asisten = confirmaciones.filter((c) => c.asistencia === "si");
  const noAsisten = confirmaciones.length - asisten.length;
  const personas = asisten.reduce((total, c) => total + c.asistentes, 0);
  const visibles = confirmaciones.filter((c) => filtro === "todos" || c.asistencia === filtro);

  const resumen = [
    { valor: personas, etiqueta: "Personas confirmadas" },
    { valor: asisten.length, etiqueta: "Respuestas: asisten" },
    { valor: noAsisten, etiqueta: "Respuestas: no asisten" },
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
                {visibles.map((c) => (
                  <tr key={c.nombre + c.fecha}>
                    <td className="serif panel-nombre">{c.nombre}</td>
                    <td>
                      <span className={`panel-estado panel-estado-${c.asistencia}`}>
                        {c.asistencia === "si" ? "Asiste" : "No asiste"}
                      </span>
                    </td>
                    <td data-etiqueta="Personas">{c.asistencia === "si" ? c.asistentes : "—"}</td>
                    <td className="panel-mensaje">{c.mensaje || "—"}</td>
                    <td className="panel-fecha">{formatoFecha.format(new Date(c.fecha))}</td>
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
