"use client";

import { UserRound, Save } from "lucide-react";

export default function FormProfile() {
  return (
    <div className="mx-auto w-full max-w-2xl p-2">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
          <UserRound size={21} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Actualizar perfil
          </h2>
          <p className="text-xs text-gray-500">
            Actualiza la información de tu cuenta en OVIADSO.
          </p>
        </div>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700"
            >
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ingresa tu nombre completo"
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="documentId"
              className="text-sm font-medium text-gray-700"
            >
              Número de documento
            </label>
            <input
              id="documentId"
              type="text"
              placeholder="Ingresa tu documento"
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 pt-3">
          <button
            type="submit"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-orange-500 px-4 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <Save size={16} />
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}