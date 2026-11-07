import { invitacion } from "@/content/invitacion";

export default function Indicaciones() {
  const items = [
    { titulo: "Niños bienvenidos", texto: "Los más pequeños también son parte de la celebración." },
    { titulo: "Pase personal", texto: "Tu invitación es válida para el número de lugares indicado, incluyendo a los niños." },
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
