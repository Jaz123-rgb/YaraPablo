import Image from "next/image";
import foto from "@/assets/anillo.jpg";
import { invitacion } from "@/content/invitacion";

export default function Celebracion() {
  const { padres } = invitacion;
  return (
    <section id="celebracion" className="section celebracion">
      <div className="celebracion-top">
        <p className="serif">Nuestro<br />amor</p>
        <Image
          src={foto}
          alt="Pablo y Yara tomados de la mano, ella muestra su anillo de compromiso"
          placeholder="blur"
          sizes="300px"
          className="celebracion-img"
        />
        <p className="serif">(y todo lo<br />que viene)</p>
      </div>
      <p className="celebracion-quote serif">
        Con la bendición de nuestros padres, tenemos el honor de invitarte a celebrar el día en que
        uniremos nuestras vidas.
      </p>
      <div className="padres">
        <div>
          <p className="eyebrow">Padres de la novia</p>
          {padres.novia.map((n, i) => <p key={i} className="padres-nombre serif">{n}</p>)}
        </div>
        <div>
          <p className="eyebrow">Padres del novio</p>
          {padres.novio.map((n, i) => <p key={i} className="padres-nombre serif">{n}</p>)}
        </div>
      </div>
    </section>
  );
}
