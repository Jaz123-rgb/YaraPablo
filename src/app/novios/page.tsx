import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import FilaInvitado, { type FilaPanel } from "@/components/FilaInvitado";
import { invitacion } from "@/content/invitacion";
import { leerConfirmaciones } from "@/lib/confirmaciones";
import { leerInvitados } from "@/lib/invitados";
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

  const [invitados, confirmaciones] = await Promise.all([leerInvitados(), leerConfirmaciones()]);
  const orden = new Map(confirmaciones.map((c, i) => [c.clave, i]));

  const filas: FilaPanel[] = invitados
    .map((i) => {
      const c = confirmaciones.find((r) => r.clave === i.slug);
      return {
        slug: i.slug,
        nombre: i.nombre,
        lugares: i.lugares,
        estado: c?.asistencia ?? "pendiente",
        asistentes: c?.asistentes ?? 0,
        mensaje: c?.mensaje ?? "",
        fecha: c ? formatoFecha.format(new Date(c.fecha)) : "",
      };
    })
    // Primero las respuestas más recientes, después las pendientes en orden de la lista.
    .sort((a, b) => (orden.get(a.slug) ?? Infinity) - (orden.get(b.slug) ?? Infinity));

  const visibles = filas.filter((f) => filtro === "todos" || f.estado === filtro);
  const asisten = filas.filter((f) => f.estado === "si");
  const noAsisten = filas.filter((f) => f.estado === "no").length;
  const pendientes = filas.filter((f) => f.estado === "pendiente").length;
  const personas = asisten.reduce((total, f) => total + f.asistentes, 0);
  const lugares = invitados.reduce((total, i) => total + i.lugares, 0);

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
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((f) => <FilaInvitado key={f.slug} fila={f} />)}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
