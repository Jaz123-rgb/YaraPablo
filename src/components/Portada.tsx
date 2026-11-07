import Image from "next/image";
import foto from "@/assets/portada-cueva.jpg";
import { invitacion } from "@/content/invitacion";

const links = [
  { href: "#celebracion", label: "Celebración" },
  { href: "#itinerario", label: "Itinerario" },
  { href: "#dresscode", label: "Dress code" },
  { href: "#regalos", label: "Regalos" },
  { href: "#hospedaje", label: "Hospedaje" },
  { href: "#rsvp", label: "Confirmar" },
];

export default function Portada() {
  return (
    <header id="portada" className="portada">
      <Image
        src={foto}
        alt="Pablo y Yara abrazados dentro de un cenote"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="portada-img"
      />
      <div className="portada-overlay" aria-hidden="true" />
      <nav className="portada-nav">
        <a href="#portada" className="portada-logo script">{invitacion.iniciales}</a>
        <div className="portada-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
      </nav>
      <div className="portada-hero">
        <p className="portada-kicker">Con mucho amor</p>
        <h1 className="portada-title script">{invitacion.novios}</h1>
        <p className="portada-sub serif">Nos casamos</p>
        <a href="#rsvp" className="btn btn-outline-light">Confirmar asistencia</a>
      </div>
      <div className="portada-footer">
        <span>{invitacion.fecha}</span>
        <span>{invitacion.lugarCorto}</span>
      </div>
    </header>
  );
}
