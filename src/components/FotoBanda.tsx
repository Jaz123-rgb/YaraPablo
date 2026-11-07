import Image from "next/image";
import foto from "@/assets/banda-beso.jpg";

export default function FotoBanda() {
  return (
    <div className="foto-banda">
      <Image
        src={foto}
        alt="Pablo y Yara se besan descalzos en el agua de un cenote"
        fill
        placeholder="blur"
        sizes="100vw"
      />
    </div>
  );
}
