"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_PANEL, passwordCorrecta, tokenSesion } from "@/lib/panelAuth";

export async function entrar(formData: FormData) {
  const intento = formData.get("password");
  const token = tokenSesion();
  if (typeof intento !== "string" || !token || !passwordCorrecta(intento)) {
    redirect("/novios?error=1");
  }
  (await cookies()).set(COOKIE_PANEL, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/novios",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/novios");
}

export async function salir() {
  (await cookies()).delete({ name: COOKIE_PANEL, path: "/novios" });
  redirect("/novios");
}
