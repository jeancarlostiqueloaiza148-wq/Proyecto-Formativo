"use client";

import { useState } from "react";

interface FormCreationResponsiblesProps {
  onClose?: () => void;
}

function FormCreationResponsibles({
  onClose,
}: FormCreationResponsiblesProps) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const closeForm = () => {
    setShowForm(false);
    setError("");

    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      document: formData.get("document"),
      postJob: formData.get("postJob"),
      active: formData.get("active") === "true",
      phone: formData.get("phone"),
      email: formData.get("email"),
    };

    console.log("Datos crear responsable:", data);

    try {
      const response = await fetch(
        "http://localhost:3001/api/responsible/responsibles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      console.log("Respuesta crear responsable:", result);

      if (!response.ok) {
        setError(
          result.message ||
            result.mensaje ||
            "No se pudo crear el responsable",
        );
        return;
      }

      alert("Responsable creado correctamente");

      form.reset();

      closeForm();
    } catch (error) {
      console.error(
        "Error al crear el responsable:",
        error,
      );

      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BOTÓN */}
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="ml-auto rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-500"
      >
        + Crear Responsable
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl">
            {/* ENCABEZADO */}
            <div className="flex items-center justify-between bg-gray-200 px-5 py-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Crear Responsable
                </h2>

                <p className="text-xs text-gray-500">
                  Registra la información del nuevo responsable
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-gray-700 transition hover:bg-gray-400"
              >
                ×
              </button>
            </div>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* NOMBRE */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ingrese el nombre"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* APELLIDO */}
                <div>
                  <label
                    htmlFor="lastname"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Apellido
                  </label>

                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Ingrese el apellido"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* DOCUMENTO */}
                <div>
                  <label
                    htmlFor="document"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Documento
                  </label>

                  <input
                    type="text"
                    id="document"
                    name="document"
                    placeholder="Ingrese el documento"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* TELÉFONO */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Teléfono
                  </label>

                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Ingrese el teléfono"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* CORREO */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingrese el correo"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* TRABAJO POSTERIOR */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="postJob"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Trabajo posterior
                  </label>

                  <input
                    type="text"
                    id="postJob"
                    name="postJob"
                    placeholder="Ingrese el trabajo posterior"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* ESTADO */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="active"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Estado
                  </label>

                  <select
                    id="active"
                    name="active"
                    defaultValue="true"
                    required
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>

              {/* MENSAJE DE ERROR */}
              {error && (
                <div className="mt-3 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* SEPARADOR */}
              <div className="my-4 border-t border-gray-200" />

              {/* BOTONES */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
                >
                  {loading ? "Creando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FormCreationResponsibles;