"use client";

import { useEffect, useState } from "react";

interface FormCreationMortalityProps {
  onClose?: () => void;
}

interface Ovine {
  id: number;
  name: string;
  tag: string;
}

function FormCreationMortality({
  onClose,
}: FormCreationMortalityProps) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ovines, setOvines] = useState<Ovine[]>([]);
  const [loadingOvines, setLoadingOvines] = useState(false);

  useEffect(() => {
    if (!showForm) return;

    const fetchOvines = async () => {
      setLoadingOvines(true);
      setError("");

      try {
        const allOvines: Ovine[] = [];
        const limit = 10;
        let offset = 0;

        while (true) {
          const response = await fetch(
            `http://localhost:3001/api/ovine/ovines?limit=${limit}&offset=${offset}`,
          );

          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              result.mensaje || "No se pudieron cargar los ovinos",
            );
          }

          const currentOvines: Ovine[] = Array.isArray(result.data)
            ? result.data
            : [];

          allOvines.push(...currentOvines);

          if (currentOvines.length < limit) {
            break;
          }

          offset += limit;
        }

        setOvines(allOvines);
      } catch (error) {
        console.error("Error al cargar los ovinos:", error);
        setError("No se pudieron cargar los ovinos registrados");
      } finally {
        setLoadingOvines(false);
      }
    };

    fetchOvines();
  }, [showForm]);

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
      date: formData.get("date"),
      ovine_id: Number(formData.get("ovine_id")),
      cause: formData.get("cause"),
      postJob: formData.get("postJob"),
      active: true,
      description: formData.get("description"),
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/mortality/mortalities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      console.log("Respuesta crear mortalidad:", result);

      if (!response.ok) {
        setError(
          result.message ||
            result.mensaje ||
            "No se pudo crear la mortalidad",
        );
        return;
      }

      alert("Mortalidad creada correctamente");

      form.reset();
      closeForm();
    } catch (error) {
      console.error("Error al crear la mortalidad:", error);
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
        + Crear Mortalidad
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* ENCABEZADO */}
            <div className="flex items-center justify-between bg-gray-200 px-5 py-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Crear Mortalidad
                </h2>

                <p className="text-sm text-gray-500">
                  Registra la información de la mortalidad
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
                {/* FECHA */}
                <div>
                  <label
                    htmlFor="date"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Fecha
                  </label>

                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* OVINO */}
                <div>
                  <label
                    htmlFor="ovine_id"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Ovino
                  </label>

                  <select
                    id="ovine_id"
                    name="ovine_id"
                    defaultValue=""
                    required
                    disabled={loadingOvines || ovines.length === 0}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500 disabled:bg-gray-100"
                  >
                    <option value="" disabled>
                      {loadingOvines
                        ? "Cargando ovinos..."
                        : ovines.length === 0
                          ? "No hay ovinos disponibles"
                          : "Seleccione un ovino"}
                    </option>

                    {ovines.map((ovine) => (
                      <option key={ovine.id} value={ovine.id}>
                        {ovine.name} - {ovine.tag}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CAUSA */}
                <div>
                  <label
                    htmlFor="cause"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Causa
                  </label>

                  <input
                    type="text"
                    id="cause"
                    name="cause"
                    placeholder="Ingrese la causa"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* TRABAJO POSTERIOR */}
                <div>
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

                {/* DESCRIPCIÓN */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Descripción
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows={2}
                    placeholder="Ingrese la descripción"
                    required
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mt-3 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* SEPARADOR */}
              <div className="my-4 border-t border-gray-200" />

              {/* BOTONES */}
              <div className="flex justify-end gap-3">
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
                  disabled={loading || loadingOvines || ovines.length === 0}
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

export default FormCreationMortality;