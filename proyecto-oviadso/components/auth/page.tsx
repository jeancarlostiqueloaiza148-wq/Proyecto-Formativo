"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PropsResetPassword = {
  textButton: string;
  OnClick?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ResetPassword(props: PropsResetPassword) {
  const [email, setEmail] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMensaje("Ingrese su correo electrónico.");
      return;
    }

    setIsSending(true);
    setMensaje("");

    try {
      const response = await fetch(
        "http://localhost:3001/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMensaje(
          data.mensaje || data.message || "No se pudo procesar la solicitud."
        );
        return;
      }

      setMensaje(
        data.mensaje ||
          data.message ||
          "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña."
      );
    } catch (error) {
      console.error("Error al solicitar recuperación:", error);
      setMensaje(
        "No se pudo conectar con el servidor. Verifica que el backend esté funcionando."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleBack = () => {
    props.onOpenChange?.(false);
    props.OnClick?.();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-sm overflow-hidden rounded-[24px] border-0 bg-white p-0 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-300 via-gray-300 to-gray-300 px-6 py-5">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

          <DialogHeader className="relative z-10 text-center">
            <DialogTitle className="text-2xl font-bold tracking-tight text-black">
              Recuperar Contraseña
            </DialogTitle>

            <p className="mt-2 text-sm text-black">
              Ingrese su correo electrónico
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6">
            <div className="space-y-5">
              <FieldGroup>
                <Field>
                  <Label
                    htmlFor="usuario"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Correo electrónico
                  </Label>

                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                        />
                      </svg>
                    </div>

                    <Input
                      id="usuario"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingrese su correo electrónico"
                      required
                      className="h-10 w-full rounded-xl border-gray-200 bg-gray-50 pl-9 pr-3.5 text-sm shadow-sm transition-all duration-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-200"
                    />
                  </div>
                </Field>
              </FieldGroup>

              {mensaje && (
                <p
                  role="status"
                  aria-live="polite"
                  className="text-sm text-gray-700"
                >
                  {mensaje}
                </p>
              )}
            </div>

            <DialogFooter className="mt-6 flex flex-row gap-3 sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="h-10 flex-1 rounded-xl border-gray-300 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100"
              >
                Atrás
              </Button>

              <Button
                type="submit"
                disabled={isSending}
                className="h-10 flex-1 rounded-xl bg-green-400 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-500"
              >
                {isSending ? "Enviando..." : "Reestablecer"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}