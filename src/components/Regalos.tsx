import Image from "next/image";
import jardin from "@/assets/regalos-jardin.jpg";
import manos from "@/assets/regalos-manos.jpg";
import CopiarClabe from "@/components/CopiarClabe";
import { invitacion } from "@/content/invitacion";

export default function Regalos() {
  const { regalo, iniciales } = invitacion;
  return (
    <section id="regalos" className="regalos dark">
      <div className="regalos-inner">
        <div className="regalos-fotos">
          <Image
            src={jardin}
            alt="Yara apoya la cabeza en el hombro de Pablo bajo los árboles de un jardín"
            placeholder="blur"
            sizes="(max-width: 800px) 80vw, 420px"
            className="regalos-foto-principal"
          />
          <Image
            src={manos}
            alt="Pablo y Yara tomados de la mano, vestidos de blanco"
            placeholder="blur"
            sizes="(max-width: 800px) 46vw, 240px"
            className="regalos-foto-secundaria"
          />
        </div>

        <div className="regalos-texto">
          <p className="eyebrow">Regalos</p>
          <h2 className="section-title">Tu presencia es el mejor regalo que podemos recibir.</h2>
          <p className="body-text">Pero si deseas tener un detalle con nosotros, aquí te dejamos los datos:</p>

          <div className="sobre">
            <svg className="sobre-solapa" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 0 L50 30 L100 0" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="sobre-sello script" aria-hidden="true">{iniciales}</span>
            <div className="sobre-contenido">
              <h3 className="script">{regalo.titulo}</h3>
              <p className="sobre-nota">{regalo.nota}</p>
              <p className="sobre-clabe">{regalo.clabe}</p>
              <p className="sobre-nota">{regalo.banco} · CLABE<br />{regalo.titular}</p>
              <CopiarClabe clabe={regalo.clabe} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
