import { invitacion } from "@/content/invitacion";

export default function Indicaciones() {
  const items = [
    { titulo: "Sin niños", texto: "Evento exclusivo para adultos." },
    { titulo: "Pase personal", texto: "Tu invitación es válida para el número de lugares indicado." },
    {
      titulo: "Confirma a tiempo",
      texto: `Antes del ${invitacion.fechaLimiteRsvp}, para organizar todo con cariño.`,
    },
  ];
  return (
    <section id="instrucciones" className="section indicaciones">
      <p className="eyebrow">Indicaciones</p>
      <h2 className="section-title">Una celebración solo para adultos</h2>
      <p className="body-text">
        Queremos que esta noche también sea para que ustedes la disfruten al máximo. Con todo
        cariño, les pedimos que la celebración sea sin niños.
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
