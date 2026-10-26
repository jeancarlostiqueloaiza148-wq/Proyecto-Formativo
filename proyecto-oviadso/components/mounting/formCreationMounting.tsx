"use client";

import { useEffect, useState } from "react";

interface FormCreationMountingProps {
  onClose?: () => void;
  onCreated?: () => void;
}

interface Ovine {
  id: number;
  name: string;
  tag: string;
  sex: string;
}

function FormCreationMounting({
  onClose,
  onCreated,
}: FormCreationMountingProps) {
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
        setError("No se pudieron cargar los machos reproductores");
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

  const breedingMales = ovines.filter((ovine) => {
    const sex = ovine.sex?.trim().toLowerCase();
    return sex === "macho" || sex === "m";
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      type_of_mounting: formData.get("type_of_mounting"),
      result_mounting: formData.get("result_mounting"),
      breeding_male: Number(formData.get("breeding_male")),
      active: true,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/mounting/mountings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      console.log("Respuesta crear monta:", result);

      if (!response.ok) {
        setError(
          result.message ||
            result.mensaje ||
            "No se pudo crear la monta"
        );
        return;
      }

      alert("Monta creada correctamente");

      form.reset();

      if (onCreated) {
        onCreated();
      }

      closeForm();
    } catch (error) {
      console.error("Error al crear la monta:", error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="ml-auto rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-500"
      >
        + Crear Monta
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-gray-200 px-5 py-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Crear Monta
                </h2>

                <p className="text-sm text-gray-500">
                  Registra la información de la nueva monta
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

            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="type_of_mounting"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Tipo de Monta
                  </label>

                  <input
                    type="text"
                    id="type_of_mounting"
                    name="type_of_mounting"
                    placeholder="Ingrese el tipo de monta"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="breeding_male"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Macho Reproductor
                  </label>

                  <select
                    id="breeding_male"
                    name="breeding_male"
                    defaultValue=""
                    required
                    disabled={
                      loadingOvines || breedingMales.length === 0
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500 disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {loadingOvines
                        ? "Cargando machos..."
                        : breedingMales.length === 0
                          ? "No hay machos registrados"
                          : "Seleccione un macho"}
                    </option>

                    {breedingMales.map((ovine) => (
                      <option key={ovine.id} value={ovine.id}>
                        {ovine.name} - {ovine.tag} (ID: {ovine.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="result_mounting"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Resultado
                  </label>

                  <input
                    type="text"
                    id="result_mounting"
                    name="result_mounting"
                    placeholder="Ingrese el resultado de la monta"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-3 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="my-4 border-t border-gray-200" />

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
                    breedingMales.length === 0
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

export default FormCreationMounting;