import { invitacion } from "@/content/invitacion";

export default function Hospedaje() {
  return (
    <section id="hospedaje" className="section hospedaje">
      <p className="eyebrow">¿Vienes de fuera?</p>
      <h2 className="section-title">Hospedaje</h2>
      <p className="body-text">
        Te dejamos algunas opciones cerca del lugar para que llegues y descanses sin prisas.
      </p>
      <div className="cards">
        {invitacion.hospedaje.map((opcion, i) => (
          <div key={i} className="card">
            <p className="eyebrow">{opcion.tipo}</p>
            <h3>{opcion.nombre}</h3>
            <p>{opcion.detalle}</p>
            <a href={opcion.link.url} className="text-link">{opcion.link.texto}</a>
          </div>
        ))}
      </div>
    </section>
  );
}
