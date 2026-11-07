import Image from "next/image";
import monograma from "@/assets/monograma.png";
import { invitacion } from "@/content/invitacion";

export default function Cierre() {
  return (
    <footer className="section cierre dark">
      <p className="cierre-nombres script">{invitacion.novios}</p>
      <p className="eyebrow">{invitacion.fechaCorta}</p>
      <div className="cierre-contacto">
        <span>Dudas:</span>
        {invitacion.contacto.telefonos.map((telefono) => (
          <a key={telefono} href={`tel:${telefono.replaceAll(" ", "")}`}>{telefono}</a>
        ))}
        <a href={`mailto:${invitacion.contacto.correo}`}>{invitacion.contacto.correo}</a>
      </div>
      <Image src={monograma} alt="Monograma JA" sizes="72px" className="cierre-monograma" />
    </footer>
  );
}
