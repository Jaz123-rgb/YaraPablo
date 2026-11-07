import Portada from "@/components/Portada";
import Celebracion from "@/components/Celebracion";
import Contador from "@/components/Contador";
import FotoBanda from "@/components/FotoBanda";
import Itinerario from "@/components/Itinerario";
import DressCode from "@/components/DressCode";
import Indicaciones from "@/components/Indicaciones";
import Regalos from "@/components/Regalos";
import Hospedaje from "@/components/Hospedaje";
import Rsvp from "@/components/Rsvp";
import Cierre from "@/components/Cierre";
import Musica from "@/components/Musica";
import { buscarConfirmacion } from "@/lib/confirmaciones";
import { buscarInvitado } from "@/lib/invitados";

export default async function Home({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  const { f } = await searchParams;
  const invitado = await buscarInvitado(f);
  const respuesta = invitado ? await buscarConfirmacion(invitado.slug) : null;

  return (
    <div className="page">
      <Portada />
      <Celebracion />
      <Contador />
      <FotoBanda />
      <Itinerario />
      <DressCode />
      <Indicaciones />
      <Regalos />
      <Hospedaje />
      <Rsvp invitado={invitado} respuesta={respuesta} />
      <Cierre />
      <Musica />
    </div>
  );
}
