"use client";

import {
  Eye,
  EyeClosed,
  LockKeyhole,
  Save,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { useState } from "react";

export default function FormPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="mx-auto w-full max-w-2xl p-4 sm:p-6">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xl shadow-gray-200/50"
      >
        {/* Encabezado */}
        <div className="relative overflow-hidden border-b border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 px-6 py-7 sm:px-8">
          <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-orange-200/20 blur-2xl" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200">
              <LockKeyhole size={26} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-800 sm:text-2xl">
                Cambiar contraseña
              </h2>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Actualiza tus credenciales de acceso a OVIADSO.
              </p>
            </div>
          </div>
        </div>

        {/* Campos */}
        <div className="space-y-6 px-6 py-7 sm:px-8 sm:py-8">
          {/* Contraseña actual */}
          <div className="space-y-2">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Contraseña actual
            </label>

            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition group-focus-within:text-orange-500">
                <KeyRound size={18} />
              </div>

              <input
                id="currentPassword"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña actual"
                autoComplete="current-password"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-11 pr-12 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100/80"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword
                    ? "Ocultar contraseña actual"
                    : "Mostrar contraseña actual"
                }
                aria-pressed={showPassword}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                {showPassword ? (
                  <Eye size={19} />
                ) : (
                  <EyeClosed size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Nueva contraseña */}
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Nueva contraseña
            </label>

            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition group-focus-within:text-orange-500">
                <KeyRound size={18} />
              </div>

              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Ingresa tu nueva contraseña"
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-11 pr-12 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100/80"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((previous) => !previous)}
                aria-label={
                  showNewPassword
                    ? "Ocultar nueva contraseña"
                    : "Mostrar nueva contraseña"
                }
                aria-pressed={showNewPassword}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                {showNewPassword ? (
                  <Eye size={19} />
                ) : (
                  <EyeClosed size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Confirmar nueva contraseña
            </label>

            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition group-focus-within:text-orange-500">
                <KeyRound size={18} />
              </div>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Escribe nuevamente tu contraseña"
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-11 pr-12 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100/80"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmación de contraseña"
                    : "Mostrar confirmación de contraseña"
                }
                aria-pressed={showConfirmPassword}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                {showConfirmPassword ? (
                  <Eye size={19} />
                ) : (
                  <EyeClosed size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Aviso de seguridad */}
          <div className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50/50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
              <ShieldCheck size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Mantén tu cuenta protegida
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Utiliza una contraseña segura y evita compartir tus
                credenciales con otras personas.
              </p>
            </div>
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-end border-t border-gray-100 bg-gray-50/70 px-6 py-5 sm:px-8">
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-semibold text-white shadow-md shadow-orange-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 active:translate-y-0 sm:w-auto"
          >
            <Save size={18} />
            Cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}