"use client";

import { useEffect, useState } from "react";
import { invitacion } from "@/content/invitacion";

const SEGUNDO = 1000;
const MINUTO = 60 * SEGUNDO;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;

function calcular(ahora: number) {
  const restante = Math.max(new Date(invitacion.fechaISO).getTime() - ahora, 0);
  return [
    { etiqueta: "Días", valor: Math.floor(restante / DIA) },
    { etiqueta: "Horas", valor: Math.floor((restante % DIA) / HORA) },
    { etiqueta: "Minutos", valor: Math.floor((restante % HORA) / MINUTO) },
    { etiqueta: "Segundos", valor: Math.floor((restante % MINUTO) / SEGUNDO) },
  ];
}

const VACIO = [
  { etiqueta: "Días", valor: null },
  { etiqueta: "Horas", valor: null },
  { etiqueta: "Minutos", valor: null },
  { etiqueta: "Segundos", valor: null },
];

export default function Contador() {
  // Se calcula solo en el navegador para que coincida con el HTML del servidor.
  const [ahora, setAhora] = useState<number | null>(null);

  useEffect(() => {
    setAhora(Date.now());
    const intervalo = setInterval(() => setAhora(Date.now()), SEGUNDO);
    return () => clearInterval(intervalo);
  }, []);

  const unidades = ahora === null ? VACIO : calcular(ahora);

  return (
    <section id="contador" className="section contador dark">
      <p className="contador-frase serif">
        {invitacion.fraseContador.map((linea) => (
          <span key={linea}>{linea}</span>
        ))}
      </p>
      <div className="contador-unidades" role="timer" aria-label={`Cuenta regresiva para el ${invitacion.fecha}`}>
        {unidades.map((u) => (
          <div key={u.etiqueta} className="contador-unidad">
            <span className="contador-numero serif">
              {u.valor === null ? "--" : String(u.valor).padStart(2, "0")}
            </span>
            <span className="contador-etiqueta">{u.etiqueta}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
