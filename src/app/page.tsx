import Portada from "@/components/Portada";
import Celebracion from "@/components/Celebracion";
import FotoBanda from "@/components/FotoBanda";
import Itinerario from "@/components/Itinerario";
import DressCode from "@/components/DressCode";
import Indicaciones from "@/components/Indicaciones";
import Regalos from "@/components/Regalos";
import Hospedaje from "@/components/Hospedaje";
import Rsvp from "@/components/Rsvp";
import Cierre from "@/components/Cierre";

export default function Home() {
  return (
    <div className="page">
      <Portada />
      <Celebracion />
      <FotoBanda />
      <Itinerario />
      <DressCode />
      <Indicaciones />
      <Regalos />
      <Hospedaje />
      <Rsvp />
      <Cierre />
    </div>
  );
}
