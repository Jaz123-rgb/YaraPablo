import { invitacion } from "@/content/invitacion";

export default function Indicaciones() {
  const items = [
    {
      titulo: "Sin niños",
      texto: "Deseamos contar con su presencia en la boda y a los niños les deseamos dulces sueños en casa.",
    },
    { titulo: "Valet parking", texto: "Sin costo, para que llegues sin preocupaciones." },
    { titulo: "Pase personal", texto: "Tu invitación es válida para el número de lugares indicado." },
    {
      titulo: "Confirma a tiempo",
      texto: `Antes del ${invitacion.fechaLimiteRsvp}, para organizar todo con cariño.`,
    },
  ];
  return (
    <section id="instrucciones" className="section indicaciones">
      <p className="eyebrow">Indicaciones</p>
      <h2 className="section-title">Algunos detalles para ese día</h2>
      <p className="body-text">
        Queremos que disfrutes este día al máximo. Con todo cariño, te compartimos lo que necesitas
        saber para celebrar con nosotros.
      </p>
      <div className="cards">
        {items.map((item) => (
          <div key={item.titulo} className="card">
            <h3>{item.titulo}</h3>
            <p>{item.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
