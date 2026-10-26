
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";

function NewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [validToken, setValidToken] = useState(false);

  // Estados de los ojos, igual que en el login
  const [eyeNewPassword, setEyeNewPassword] = useState(<EyeClosed />);
  const [typeNewPassword, setTypeNewPassword] = useState("password");

  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(
    <EyeClosed />,
  );
  const [typeConfirmPassword, setTypeConfirmPassword] =
    useState("password");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  // Verificar el token de recuperación
  useEffect(() => {
    const resetToken = searchParams.get("token");

    if (!resetToken) {
      setMessage("Token de recuperación requerido");
      setLoading(false);
      return;
    }

    setToken(resetToken);

    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/verify-reset-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: resetToken }),
          },
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          setMessage(
            data.mensaje ||
              "El enlace de recuperación no es válido o ha expirado.",
          );
          return;
        }

        setValidToken(true);
      } catch (error) {
        setMessage("No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [searchParams, API_URL]);

  // Mostrar u ocultar la nueva contraseña
  const MostrarNewPassword = () => {
    if (typeNewPassword === "password") {
      setTypeNewPassword("text");
      setEyeNewPassword(<Eye />);
    } else {
      setTypeNewPassword("password");
      setEyeNewPassword(<EyeClosed />);
    }
  };

  // Mostrar u ocultar la confirmación de contraseña
  const MostrarConfirmPassword = () => {
    if (typeConfirmPassword === "password") {
      setTypeConfirmPassword("text");
      setEyeConfirmPassword(<Eye />);
    } else {
      setTypeConfirmPassword("password");
      setEyeConfirmPassword(<EyeClosed />);
    }
  };

  // Actualizar la contraseña
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setMessage("");

    if (newPassword.length < 6) {
      setMessage("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword,
            confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(
          data.mensaje || "No se pudo actualizar la contraseña.",
        );
        return;
      }

      setMessage(
        "Contraseña actualizada correctamente. Ya puedes iniciar sesión.",
      );

      setValidToken(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("No se pudo conectar con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  // Pantalla de carga
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <p className="text-sm text-gray-600">
          Verificando enlace de recuperación...
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-orange-600">
          Nueva contraseña
        </h1>

        <p className="mb-6 text-center text-sm text-gray-600">
          Escribe y confirma tu nueva contraseña para continuar.
        </p>

        {validToken ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NUEVA CONTRASEÑA */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Nueva contraseña
              </label>

              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={typeNewPassword}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.target.value)
                  }
                  minLength={6}
                  required
                  className="h-10 w-full rounded-xl border border-gray-300 bg-gray-50 px-3 pr-11 text-sm outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Escribe tu nueva contraseña"
                />

                <button
                  type="button"
                  onClick={MostrarNewPassword}
                  className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:text-orange-600"
                  aria-label={
                    typeNewPassword === "password"
                      ? "Mostrar contraseña"
                      : "Ocultar contraseña"
                  }
                >
                  {eyeNewPassword}
                </button>
              </div>
            </div>

            {/* CONFIRMAR CONTRASEÑA */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Confirmar contraseña
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={typeConfirmPassword}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  minLength={6}
                  required
                  className="h-10 w-full rounded-xl border border-gray-300 bg-gray-50 px-3 pr-11 text-sm outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Confirma tu nueva contraseña"
                />

                <button
                  type="button"
                  onClick={MostrarConfirmPassword}
                  className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:text-orange-600"
                  aria-label={
                    typeConfirmPassword === "password"
                      ? "Mostrar contraseña"
                      : "Ocultar contraseña"
                  }
                >
                  {eyeConfirmPassword}
                </button>
              </div>
            </div>

            {/* MENSAJE */}
            {message && (
              <p
                role="status"
                className="text-center text-sm text-red-600"
              >
                {message}
              </p>
            )}

            {/* BOTÓN GUARDAR */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-orange-600 px-4 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Actualizando..."
                : "Guardar nueva contraseña"}
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            {message && (
              <p
                role="status"
                className="text-sm leading-6 text-gray-700"
              >
                {message}
              </p>
            )}

            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-xl bg-orange-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default function NewPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
          <p className="text-sm text-gray-600">
            Verificando enlace...
          </p>
        </main>
      }
    >
      <NewPasswordForm />
    </Suspense>
  );
}