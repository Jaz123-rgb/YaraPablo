// Todo el texto editable de la invitación vive aquí.
// Reemplaza los valores entre [corchetes] con los datos reales.

export const invitacion = {
  novios: "Pablo & Yara",
  iniciales: "P & Y",
  fecha: "13 de febrero, 2027 · 12:00 pm",
  fechaCorta: "13 · febrero · 2027",
  // Hora de México (UTC-6). El contador llega a cero en este momento.
  fechaISO: "2027-02-13T12:00:00-06:00",
  fraseContador: [
    "La vida no sería igual sin familia a la que llamamos amigos y amigos a los que llamamos familia.",
    "Nuestro amor merece una gran celebración y queremos que seas parte de ella.",
  ],
  lugarCorto: "Jardín Rincón Dorado, Xochitepec",
  fechaLimiteRsvp: "13 de enero",

  padres: {
    novia: ["Andrea Orozco Álvarez", "Jorge Alberto Pérez Quintana"],
    novio: ["Jesús Pablo Garay Torres †", "Olga López Rodríguez"],
  },

  itinerario: [
    { hora: "12:30 pm", evento: "Ceremonia" },
    { hora: "2:30 pm", evento: "Cóctel" },
    { hora: "4:00 pm", evento: "Banquete" },
  ],

  lugares: [
    {
      titulo: "Ceremonia y recepción",
      nombre: "Jardín Rincón Dorado",
      direccion: "Chiconcuac, Xochitepec, Morelos",
      mapa: "https://www.google.com/maps/place/Jardin+Rincon+Dorado/@18.7885653,-99.2028331,17z/data=!3m1!4b1!4m6!3m5!1s0x85cdd81249a7b9ed:0x25db08916b53c7e4!8m2!3d18.7885653!4d-99.2028331!16s%2Fg%2F1pyqmrbfh",
    },
  ],
  estacionamiento: "[detalle de estacionamiento o valet]",

  dressCode: {
    nombre: "Garden Formal Party",
    inspiracionEllas: "https://mx.pinterest.com/juanpablogaraylopez/dresscode-boda-ja/?invite_code=9977a295ab7e441181dcadb36032822b&sender=640707621896192464",
    inspiracionEllos: "https://mx.pinterest.com/juanpablogaraylopez/dresscode-boda-ja/?invite_code=9977a295ab7e441181dcadb36032822b&sender=640707621896192464",
  },

  regalo: {
    titulo: "Lluvia de sobres",
    nota: "El día del evento, o por transferencia:",
    banco: "BBVA",
    clabe: "012180015153629862",
    titular: "Juan Pablo Garay López",
  },

  hospedaje: [
    {
      tipo: "Hotel",
      nombre: "[Nombre del hotel]",
      detalle: "A [00] min del lugar. Tarifa preferencial con el código [CÓDIGO].",
      link: { texto: "Reservar →", url: "#hospedaje" },
    },
    {
      tipo: "Hotel",
      nombre: "[Nombre del hotel]",
      detalle: "A [00] min del lugar. Tarifa preferencial con el código [CÓDIGO].",
      link: { texto: "Reservar →", url: "#hospedaje" },
    },
    {
      tipo: "Airbnb",
      nombre: "Casas y departamentos",
      detalle: "Recomendamos buscar en la zona de [colonia / zona], a pocos minutos del evento.",
      link: { texto: "Ver opciones →", url: "https://www.airbnb.mx" },
    },
  ],

  contacto: {
    telefono: "[teléfono / WhatsApp]",
    correo: "[correo@ejemplo.com]",
  },

  cancion: { youtubeId: "-D_CivXVjzg", titulo: "Majo y Dan - Somos" },
};
