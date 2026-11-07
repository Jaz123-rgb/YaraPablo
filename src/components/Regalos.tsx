import { invitacion } from "@/content/invitacion";

export default function Regalos() {
  return (
    <section id="regalos" className="section regalos dark">
      <p className="eyebrow">Regalos</p>
      <h2 className="section-title">Tu presencia es el mejor regalo que podemos recibir.</h2>
      <p className="body-text">Pero si deseas tener un detalle con nosotros, aquí te dejamos los datos:</p>
      <div className="cards">
        {invitacion.regalos.map((regalo) => (
          <div key={regalo.titulo} className="card">
            <h3>{regalo.titulo}</h3>
            <p>{regalo.detalle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
