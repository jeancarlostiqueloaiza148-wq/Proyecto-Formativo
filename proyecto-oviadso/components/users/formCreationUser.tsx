"use client";

import { useState } from "react";

interface FormCreationUserProps {
  onClose?: () => void;
}

function FormCreationUser({ onClose }: FormCreationUserProps) {
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
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      id_rol: Number(formData.get("id_rol")),
      postJob: formData.get("postJob"),
      verifyEmail: false,
      active: true,
      status: true,
      documentId: formData.get("documentId"),
    };

    console.log("Datos crear usuario:", data);

    try {
      const response = await fetch(
        "http://localhost:3001/api/user/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      console.log("Respuesta crear usuario:", result);

      if (!response.ok) {
        setError(
          result.message ||
            result.mensaje ||
            "No se pudo crear el usuario",
        );
        return;
      }

      alert("Usuario creado correctamente");

      form.reset();

      closeForm();
    } catch (error) {
      console.error("Error al crear el usuario:", error);

      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BOTÓN CREAR USUARIO */}
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="ml-auto rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-500"
      >
        + Crear Usuario
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* ENCABEZADO */}
            <div className="flex items-center justify-between bg-gray-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Crear Usuario
                </h2>

                <p className="text-sm text-gray-500">
                  Registra la información del nuevo usuario
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-gray-700 transition hover:bg-gray-400"
              >
                ×
              </button>
            </div>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="p-6">

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* USUARIO */}
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Nombre de usuario
                  </label>

                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Ingrese el usuario"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                  />
                </div>

                {/* CORREO */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingrese el correo"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                  />
                </div>

                {/* CONTRASEÑA */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingrese la contraseña"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                  />
                </div>

                {/* DOCUMENTO */}
                <div>
                  <label
                    htmlFor="documentId"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Documento
                  </label>

                  <input
                    type="text"
                    id="documentId"
                    name="documentId"
                    placeholder="Ingrese el documento"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                  />
                </div>

                {/* ROL */}
                <div>
                  <label
                    htmlFor="id_rol"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Rol
                  </label>

                  <select
                    id="id_rol"
                    name="id_rol"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      Seleccione un rol
                    </option>

                    <option value="1">
                      Administrador
                    </option>

                    <option value="2">
                      Veterinario
                    </option>

                    <option value="3">
                      Aprendiz
                    </option>

                    <option value="4">
                      Instructor
                    </option>
                  </select>
                </div>

                {/* TRABAJO POSTERIOR */}
                <div>
                  <label
                    htmlFor="postJob"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Trabajo posterior
                  </label>

                  <input
                    type="text"
                    id="postJob"
                    name="postJob"
                    placeholder="Ingrese el trabajo posterior"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                  />
                </div>

              </div>

              {/* MENSAJE DE ERROR */}
              {error && (
                <div className="mt-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* SEPARADOR */}
              <div className="my-6 border-t border-gray-200"></div>

              {/* BOTONES */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-emerald-400 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
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

export default FormCreationUser;