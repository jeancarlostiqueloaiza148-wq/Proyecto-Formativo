"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PageNewPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingToken, setLoadingToken] = useState(true);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [tokenValid, setTokenValid] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("No se encontró el token de recuperación.");
        setTokenValid(false);
        setLoadingToken(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3001/api/auth/verify-reset-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
            }),
          }
        );

        const data = await response.json();

        if (response.ok && data.success === true) {
          setTokenValid(true);
          setError("");
        } else {
          setTokenValid(false);
          setError(
            data.mensaje || "El enlace no es válido o ha expirado."
          );
        }
      } catch (error) {
        console.error("Error validando token:", error);

        setTokenValid(false);
        setError("No fue posible conectar con el servidor.");
      } finally {
        setLoadingToken(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!token) {
      setError("El token de recuperación es obligatorio.");
      return;
    }

    if (!newPassword) {
      setError("La nueva contraseña es obligatoria.");
      return;
    }

    if (!confirmPassword) {
      setError("Debe confirmar la nueva contraseña.");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoadingPassword(true);

      const response = await fetch(
        "http://localhost:3001/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.mensaje || "No fue posible cambiar la contraseña."
        );
        return;
      }

      setMessage("Contraseña restablecida correctamente.");

      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error) {
      console.error("Error cambiando contraseña:", error);

      setError("No fue posible conectar con el servidor.");
    } finally {
      setLoadingPassword(false);
    }
  };

  // if (loadingToken) {
  //   return (
  //     <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4">
  //       <section className="w-full max-w-md">
  //         <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-8 sm:p-10 text-center">
  //           <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />

  //           <h1 className="text-xl font-bold text-gray-800">
  //             Validando enlace
  //           </h1>

  //           <p className="mt-2 text-sm text-gray-500">
  //             Estamos verificando tu token de recuperación...
  //           </p>
  //         </div>
  //       </section>
  //     </main>
  //   );
  // }

  // if (!tokenValid) {
  //   return (
  //     <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4">
  //       <section className="w-full max-w-md">
  //         <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-8 sm:p-10 text-center">
  //           <h1 className="text-2xl font-bold text-gray-800">
  //             Enlace no válido
  //           </h1>

  //           <p className="mt-3 text-sm leading-6 text-gray-500">
  //             {error}
  //           </p>

  //           <button
  //             type="button"
  //             onClick={() => router.push("/auth/forgot-password")}
  //             className="mt-6 w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white"
  //           >
  //             Solicitar nuevo enlace
  //           </button>
  //         </div>
  //       </section>
  //     </main>
  //   );
  // }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4">
      <section className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-8 sm:p-10">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Nueva contraseña
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Crea una nueva contraseña para tu cuenta.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nueva contraseña
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                placeholder="Ingresa tu nueva contraseña"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirmar contraseña
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Repite tu nueva contraseña"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loadingPassword}
              className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white disabled:opacity-60"
            >
              {loadingPassword
                ? "Cambiando contraseña..."
                : "Cambiar contraseña"}
            </button>

          </form>

        </div>
      </section>
    </main>
  );
}