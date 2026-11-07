import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_PANEL = "panel_novios";

function iguales(a: string, b: string) {
  const hash = (v: string) => createHash("sha256").update(v).digest();
  return timingSafeEqual(hash(a), hash(b));
}

export function passwordCorrecta(intento: string) {
  const password = process.env.PANEL_PASSWORD;
  return Boolean(password) && iguales(intento, password as string);
}

/** Token de sesión derivado de la contraseña: al cambiarla se cierran todas las sesiones. */
export function tokenSesion() {
  const password = process.env.PANEL_PASSWORD;
  return password ? createHmac("sha256", password).update("panel-novios").digest("hex") : null;
}

export function sesionValida(valor: string | undefined) {
  const token = tokenSesion();
  return Boolean(token && valor) && iguales(valor as string, token as string);
}
