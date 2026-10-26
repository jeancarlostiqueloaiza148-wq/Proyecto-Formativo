"use client";

import { useEffect, useState } from "react";

interface FormCreationFeedingProps {
  onClose?: () => void;
}

interface Ovine {
  id: number;
  name: string;
  tag: string;
}

function FormCreationFeeding({
  onClose,
}: FormCreationFeedingProps) {
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
        let allOvines: Ovine[] = [];
        let offset = 0;
        const limit = 10;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `http://localhost:3001/api/ovine/ovines?limit=${limit}&offset=${offset}`
          );

          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              result.message ||
                result.mensaje ||
                "No se pudieron cargar los ovinos"
            );
          }

          const data: Ovine[] = result.data || [];
          allOvines = [...allOvines, ...data];

          if (data.length < limit) {
            hasMore = false;
          } else {
            offset += limit;
          }
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
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      date: formData.get("date"),
      ovine_id: Number(formData.get("ovine_id")),
      food_type: formData.get("food_type"),
      quantity: Number(formData.get("quantity")),
      postJob: formData.get("postJob"),
      notes: formData.get("notes"),
      active: true,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/feeding/feedings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      console.log("Respuesta crear alimentación:", result);

      if (!response.ok) {
        setError(
          result.message ||
            result.mensaje ||
            "No se pudo crear la alimentación"
        );
        return;
      }

      alert("Alimentación creada correctamente");

      form.reset();
      closeForm();
    } catch (error) {
      console.error("Error al crear la alimentación:", error);
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
        className="ml-auto bg-emerald-400 hover:bg-emerald-500 text-white font-medium px-4 py-2 text-sm rounded-lg shadow-sm transition"
      >
        + Crear Alimentación
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* ENCABEZADO */}
            <div className="flex items-center justify-between bg-gray-200 px-5 py-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Crear Alimentación
                </h2>

                <p className="text-sm text-gray-500">
                  Registra la información de la alimentación
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
                    disabled={
                      loadingOvines ||
                      !!error ||
                      ovines.length === 0
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500 disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {loadingOvines
                        ? "Cargando ovinos..."
                        : error
                          ? "Error al cargar ovinos"
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

                {/* TIPO DE ALIMENTO */}
                <div>
                  <label
                    htmlFor="food_type"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Tipo de alimento
                  </label>

                  <input
                    type="text"
                    id="food_type"
                    name="food_type"
                    placeholder="Ingrese el tipo de alimento"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* CANTIDAD */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Cantidad
                  </label>

                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0.01"
                    step="any"
                    placeholder="Ingrese la cantidad"
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

                {/* OBSERVACIONES */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="notes"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Observaciones
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    placeholder="Ingrese las observaciones"
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
              <div className="my-4 border-t border-gray-200"></div>

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
                  disabled={
                    loading ||
                    loadingOvines ||
                    !!error ||
                    ovines.length === 0
                  }
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

export default FormCreationFeeding;