import { invitacion } from "@/content/invitacion";

export default function Itinerario() {
  return (
    <section id="itinerario" className="itinerario">
      <div className="itinerario-lista">
        <h2>Itinerario</h2>
        {invitacion.itinerario.map((item) => (
          <div key={item.hora} className="itinerario-fila">
            <span>{item.hora}</span>
            <span>{item.evento}</span>
          </div>
        ))}
      </div>
      <div id="lugar" className="lugar">
        <h2>El lugar</h2>
        {invitacion.lugares.map((lugar) => (
          <div key={lugar.titulo} className="lugar-item">
            <h3>{lugar.titulo}</h3>
            <p>{lugar.nombre}<br />{lugar.direccion}</p>
            <a href={lugar.mapa} target="_blank" rel="noopener noreferrer" className="text-link">
              Ver en Google Maps →
            </a>
          </div>
        ))}
        <p className="lugar-nota">Estacionamiento: {invitacion.estacionamiento}.</p>
      </div>
    </section>
  );
}
