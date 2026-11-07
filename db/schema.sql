-- Una fila por invitación: si responde otra vez, se actualiza su respuesta.
CREATE TABLE IF NOT EXISTS confirmaciones (
  clave      text PRIMARY KEY,
  nombre     text NOT NULL,
  asistencia text NOT NULL CHECK (asistencia IN ('si', 'no')),
  asistentes integer NOT NULL DEFAULT 0,
  mensaje    text NOT NULL DEFAULT '',
  fecha      timestamptz NOT NULL DEFAULT now()
);
