const COLORES_CONFETI = ["#fffff0", "#e9e1d3", "#cdbfa8", "#c6a66b", "#7a2e1f", "#221f1c"];

export async function lanzarConfeti() {
  const { default: confetti } = await import("canvas-confetti");
  const base = { colors: COLORES_CONFETI, disableForReducedMotion: true, zIndex: 100 };

  confetti({ ...base, particleCount: 120, spread: 90, startVelocity: 45, origin: { y: 0.6 } });

  const fin = Date.now() + 1500;
  (function rafaga() {
    confetti({ ...base, particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } });
    confetti({ ...base, particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } });
    if (Date.now() < fin) requestAnimationFrame(rafaga);
  })();
}

/** Hay que crearlo durante el clic: los navegadores bloquean el audio iniciado después. */
export function crearAudio() {
  const Contexto = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Contexto) return null;
  const audio = new Contexto();
  void audio.resume();
  return audio;
}

function sonarAbucheo(audio: AudioContext, inicio: number) {
  const duracion = 1.2;
  const salida = audio.createGain();
  salida.gain.setValueAtTime(0, inicio);
  salida.gain.linearRampToValueAtTime(0.1, inicio + 0.15);
  salida.gain.setValueAtTime(0.1, inicio + duracion - 0.4);
  salida.gain.linearRampToValueAtTime(0, inicio + duracion);

  // Un filtro alrededor de la vocal "u" hace que varias voces desafinadas suenen a público.
  const vocal = audio.createBiquadFilter();
  vocal.type = "bandpass";
  vocal.frequency.value = 420;
  vocal.Q.value = 1.2;
  vocal.connect(salida).connect(audio.destination);

  for (const tono of [118, 131, 142, 155, 171]) {
    const voz = audio.createOscillator();
    voz.type = "sawtooth";
    voz.frequency.setValueAtTime(tono, inicio);
    voz.frequency.exponentialRampToValueAtTime(tono * 0.68, inicio + duracion);
    voz.connect(vocal);
    voz.start(inicio);
    voz.stop(inicio + duracion);
  }
  return inicio + duracion;
}

function sonarTromboneTriste(audio: AudioContext, inicio: number) {
  const notas = [
    { frecuencia: 293.66, duracion: 0.32 },
    { frecuencia: 277.18, duracion: 0.32 },
    { frecuencia: 261.63, duracion: 0.32 },
    { frecuencia: 246.94, duracion: 1.1 },
  ];

  const filtro = audio.createBiquadFilter();
  filtro.type = "lowpass";
  filtro.frequency.value = 900;
  filtro.connect(audio.destination);

  let momento = inicio;
  notas.forEach((nota, i) => {
    const tono = audio.createOscillator();
    const volumen = audio.createGain();
    tono.type = "sawtooth";
    tono.frequency.value = nota.frecuencia;
    volumen.gain.setValueAtTime(0, momento);
    volumen.gain.linearRampToValueAtTime(0.09, momento + 0.03);
    volumen.gain.setValueAtTime(0.09, momento + nota.duracion - 0.08);
    volumen.gain.linearRampToValueAtTime(0, momento + nota.duracion);

    if (i === notas.length - 1) {
      const vibrato = audio.createOscillator();
      const profundidad = audio.createGain();
      vibrato.frequency.value = 5.5;
      profundidad.gain.value = 7;
      vibrato.connect(profundidad).connect(tono.frequency);
      vibrato.start(momento);
      vibrato.stop(momento + nota.duracion);
    }

    tono.connect(volumen).connect(filtro);
    tono.start(momento);
    tono.stop(momento + nota.duracion);
    momento += nota.duracion;
  });
  return momento;
}

export function sonarBuuu(audio: AudioContext) {
  const inicio = audio.currentTime + 0.05;
  const finAbucheo = sonarAbucheo(audio, inicio);
  const fin = sonarTromboneTriste(audio, finAbucheo + 0.1);
  setTimeout(() => void audio.close(), (fin - inicio + 0.3) * 1000);
}
