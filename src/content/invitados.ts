// Lista de invitaciones. Cada una tiene su enlace: https://yara-pablo.vercel.app/?f=<slug>
// Los lugares de cada invitación son invitados + niños.

export type Invitado = { nombre: string; slug: string; lugares: number };

const lista: [nombre: string, invitados: number, ninos?: number][] = [
  ["García", 5],
  ["Villalba", 4],
  ["Remigio", 4],
  ["Alcántara", 4, 1],
  ["Vélez", 2],
  ["Ríos Mondragón", 2],
  ["Ríos Rojas", 2],
  ["Pineda", 4, 1],
  ["Dani Velázquez", 1],
  ["Owen", 1],
  ["Domínguez", 3],
  ["Casanova", 3],
  ["Jacinto", 3],
  ["Medina", 3],
  ["Fuentes", 4],
  ["Marker", 3],
  ["Ps. Rios", 2],
  ["Luis García", 1],
  ["Elías García", 1],
  ["Pérez", 5],
  ["Garay", 4],
  ["Orozco Perdomo", 2, 2],
  ["Orozco López", 2, 1],
  ["Francisco Orozco", 3],
  ["Ana María Álvarez", 1],
  ["Guadalupe Pérez", 2],
  ["Norma Pérez", 2],
  ["Anayeli Pérez", 3],
  ["Naty", 3, 3],
  ["Jesús Pérez", 4],
  ["Dayani", 2],
  ["Oscar Pérez", 2],
  ["Jesica Pérez", 2],
  ["Maricela Pérez", 5],
  ["Abuelitos Pérez", 2],
  ["Familia Garay López", 28, 3],
  ["Lau Villanueva", 2, 1],
  ["Palma", 5],
  ["Grillo", 1],
  ["Rich", 1],
  ["Aarón Escartín", 1],
  ["Sam Alvarez", 1],
];

const crearSlug = (nombre: string) =>
  nombre
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const invitados: Invitado[] = lista.map(([nombre, personas, ninos = 0]) => ({
  nombre,
  slug: crearSlug(nombre),
  lugares: personas + ninos,
}));

export const buscarInvitado = (slug?: string) => invitados.find((i) => i.slug === slug) ?? null;
