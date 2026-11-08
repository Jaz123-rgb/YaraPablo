import Image from "next/image";
import foto from "@/assets/anillo.jpg";
import { invitacion } from "@/content/invitacion";

export default function Celebracion() {
  const { padres } = invitacion;
  return (
    <section id="celebracion" className="section celebracion">
      <div className="celebracion-top">
        <blockquote className="celebracion-versiculo serif">
          <p>
            Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios ha unido, no lo
            separe el hombre.
          </p>
          <cite>Mateo 19:6</cite>
        </blockquote>
        <Image
          src={foto}
          alt="Pablo y Yara tomados de la mano, ella muestra su anillo de compromiso"
          placeholder="blur"
          sizes="300px"
          className="celebracion-img"
        />
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
