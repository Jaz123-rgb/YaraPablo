function Cresteria() {
  const voluta = (
    <>
      <path d="M0 40 C-16 34 -34 37 -52 47 C-68 56 -86 54 -90 42 C-93 32 -81 25 -74 32 C-69 37 -74 44 -80 40" />
      <path d="M0 34 C-7 22 -17 14 -30 12 C-42 10 -48 20 -41 26 C-36 30 -30 25 -33 21" />
      <path className="marco-relleno" d="M-14 32 C-24 26 -30 16 -28 4 C-18 8 -11 18 -14 32Z" />
    </>
  );
  return (
    <>
      {voluta}
      <g transform="scale(-1 1)">{voluta}</g>
      <path className="marco-relleno" d="M0 36 C-11 22 -10 6 0 -14 C10 6 11 22 0 36Z" />
      <circle className="marco-relleno" cx="0" cy="-20" r="3.5" />
    </>
  );
}

export default function MarcoVictoriano({ children }: { children: React.ReactNode }) {
  return (
    <div className="marco">
      {children}
      <svg className="marco-adorno" viewBox="0 -32 400 722" aria-hidden="true">
        <rect className="marco-banda" x="23" y="23" width="354" height="612" rx="11" />
        <rect x="11" y="11" width="378" height="636" rx="16" strokeWidth="3" />
        <rect className="marco-detalle" x="16" y="16" width="368" height="626" rx="14" strokeWidth="1" />
        <rect className="marco-perlas" x="23" y="23" width="354" height="612" rx="11" />
        <rect className="marco-detalle" x="31" y="31" width="338" height="596" rx="9" strokeWidth="1" />
        <rect className="marco-detalle" x="34" y="34" width="332" height="590" rx="8" strokeWidth="2.5" />
        <g className="marco-detalle" transform="translate(200 -11) scale(0.8)"><Cresteria /></g>
        <g className="marco-detalle" transform="translate(200 669) scale(0.8 -0.8)"><Cresteria /></g>
        <g className="marco-detalle" transform="translate(6 329) rotate(-90) scale(0.5)"><Cresteria /></g>
        <g className="marco-detalle" transform="translate(394 329) rotate(90) scale(0.5)"><Cresteria /></g>
      </svg>
    </div>
  );
}
