import Image from "next/image";
import ejemploEllas from "@/assets/dresscode-ellas.jpg";
import ejemploEllos from "@/assets/dresscode-ellos.jpg";
import MarcoVictoriano from "@/components/MarcoVictoriano";
import { invitacion } from "@/content/invitacion";

export default function DressCode() {
  const { dressCode } = invitacion;
  return (
    <section id="dresscode" className="dresscode dark">
      <div className="dresscode-inner">
        <div className="dresscode-text">
          <p className="eyebrow">Código de vestimenta</p>
          <h2 className="script">{dressCode.nombre}</h2>
          <p className="body-text">
            Formal, pensado para una celebración al aire libre: telas ligeras, colores vivos y mucha
            elegancia.
          </p>
          <div className="dresscode-detalle">
            <p className="dresscode-tip">
              Tip: tacón ancho o plataforma para caminar cómodos en el jardín. El blanco y el marfil
              se reservan para la novia; te pedimos evitar también el champagne y el negro.
            </p>
          </div>
        </div>
      </div>

      <div className="dresscode-sub">
        <div className="dresscode-sub-text">
          <h3 className="serif">Ellas</h3>
          <p className="body-text">
            Vestido largo o midi, telas con caída, estampados florales o tonos pastel.
          </p>
          <a href={dressCode.inspiracionEllas} target="_blank" rel="noopener noreferrer" className="btn btn-solid-light">
            Inspiración ellas
          </a>
        </div>
        <MarcoVictoriano>
          <Image
            src={ejemploEllas}
            alt="Paletas de color y vestidos largos en tonos verde, amarillo, azul y rosa"
            placeholder="blur"
            sizes="(max-width: 800px) 100vw, 340px"
            className="dresscode-sub-img"
          />
        </MarcoVictoriano>
      </div>

      <div className="dresscode-sub dresscode-sub-invertida">
        <div className="dresscode-sub-text">
          <h3 className="serif">Ellos</h3>
          <p className="body-text">
            Traje en tonos claros o neutros, camisa de lino o algodón; corbata opcional.
          </p>
          <a href={dressCode.inspiracionEllos} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
            Inspiración ellos
          </a>
        </div>
        <MarcoVictoriano>
          <Image
            src={ejemploEllos}
            alt="Paletas de color y trajes para hombre en tonos verde, beige, azul y rosa"
            placeholder="blur"
            sizes="(max-width: 800px) 100vw, 340px"
            className="dresscode-sub-img"
          />
        </MarcoVictoriano>
      </div>
    </section>
  );
}
