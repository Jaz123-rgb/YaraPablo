import Image from "next/image";
import foto from "@/assets/portada-caminando.jpg";
import logo from "@/assets/logo-ja.png";
import Menu from "@/components/Menu";
import { invitacion } from "@/content/invitacion";

export default function Portada() {
  return (
    <header id="portada" className="portada">
      <Image
        src={foto}
        alt="Pablo y Yara caminan de la mano dentro de un cenote"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="portada-img"
      />
      <div className="portada-overlay" aria-hidden="true" />
      <Menu />
      <div className="portada-hero">
        <h1 className="portada-title">
          <Image src={logo} alt={invitacion.novios} sizes="(max-width: 640px) 170px, 300px" className="portada-logo-ja" />
        </h1>
      </div>
      <div className="portada-footer">
        <span>{invitacion.fecha}</span>
        <span>{invitacion.lugarCorto}</span>
      </div>
    </header>
  );
}
