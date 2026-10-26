
"use client";

import { useEffect, useState } from "react";

interface FormCreationDeliveryProps {
  onClose?: () => void;
}

interface Ovine {
  id: number;
  name: string;
  tag: string;
  sex: string;
}

function FormCreationDelivery({
  onClose,
}: FormCreationDeliveryProps) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMothers, setLoadingMothers] = useState(false);
  const [mothers, setMothers] = useState<Ovine[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!showForm) return;

    const fetchMothers = async () => {
      setLoadingMothers(true);
      setError("");

      try {
        const allOvines: Ovine[] = [];
        let offset = 0;
        const limit = 10;

        while (true) {
          const response = await fetch(
            `http://localhost:3001/api/ovine/ovines?limit=${limit}&offset=${offset}`,
          );

          if (!response.ok) {
            throw new Error("No se pudieron cargar las madres");
          }

          const result = await response.json();
          const ovines: Ovine[] = result.data || [];

          allOvines.push(...ovines);

          if (ovines.length < limit) {
            break;
          }

          offset += limit;
        }

        const femaleOvines = allOvines.filter((ovine) => {
          const sex = String(ovine.sex || "")
            .trim()
            .toUpperCase();

          return (
            sex === "H" ||
            sex === "HEMBRA" ||
            sex === "F"
          );
        });

        setMothers(femaleOvines);
      } catch (error) {
        console.error("Error al cargar las madres:", error);
        setError("No se pudieron cargar las madres registradas");
      } finally {
        setLoadingMothers(false);
      }
    };

    fetchMothers();
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
      mother_id: Number(formData.get("mother_id")),
      number_of_offspring: Number(
        formData.get("number_of_offspring"),
      ),
      type_of_birth: formData.get("type_of_birth"),
      complications: formData.get("complications"),
      postJob: formData.get("postJob"),
      notes: formData.get("notes"),
      status: formData.get("status"),
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/delivery/deliveries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      console.log("Respuesta crear parto:", result);

      if (!response.ok) {
        setError(
          result.message ||
            result.mensaje ||
            "No se pudo crear el parto",
        );
        return;
      }

      alert("Parto creado correctamente");

      form.reset();
      closeForm();
    } catch (error) {
      console.error("Error al crear el parto:", error);
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
        + Crear Parto
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* ENCABEZADO */}
            <div className="flex items-center justify-between bg-gray-200 px-5 py-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Crear Parto
                </h2>

                <p className="text-sm text-gray-500">
                  Registra la información del nuevo parto
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

                {/* ID MADRE */}
                <div>
                  <label
                    htmlFor="mother_id"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    ID Madre
                  </label>

                  <select
                    id="mother_id"
                    name="mother_id"
                    defaultValue=""
                    required
                    disabled={loadingMothers || mothers.length === 0}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      {loadingMothers
                        ? "Cargando madres..."
                        : mothers.length === 0
                          ? "No hay madres registradas"
                          : "Seleccione una madre"}
                    </option>

                    {mothers.map((mother) => (
                      <option
                        key={mother.id}
                        value={mother.id}
                      >
                        {mother.name} - {mother.tag} (ID: {mother.id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* NÚMERO DE CRÍAS */}
                <div>
                  <label
                    htmlFor="number_of_offspring"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Número de Crías
                  </label>

                  <select
                    id="number_of_offspring"
                    name="number_of_offspring"
                    defaultValue=""
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      Seleccione el número de crías
                    </option>
                    <option value="1">1 Cría</option>
                    <option value="2">2 Crías</option>
                    <option value="3">3 Crías</option>
                    <option value="4">4 Crías</option>
                  </select>
                </div>

                {/* TIPO DE PARTO */}
                <div>
                  <label
                    htmlFor="type_of_birth"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Tipo de Parto
                  </label>

                  <input
                    type="text"
                    id="type_of_birth"
                    name="type_of_birth"
                    placeholder="Ingrese el tipo de parto"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* COMPLICACIONES */}
                <div>
                  <label
                    htmlFor="complications"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Complicaciones
                  </label>

                  <input
                    type="text"
                    id="complications"
                    name="complications"
                    placeholder="Ingrese las complicaciones"
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

                {/* ESTADO DEL PARTO */}
                <div>
                  <label
                    htmlFor="status"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Estado del parto
                  </label>

                  <input
                    type="text"
                    id="status"
                    name="status"
                    placeholder="Ingrese el estado del parto"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* NOTAS */}
                <div>
                  <label
                    htmlFor="notes"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Notas
                  </label>

                  <input
                    type="text"
                    id="notes"
                    name="notes"
                    placeholder="Ingrese las notas"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
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
                  disabled={loading || loadingMothers || mothers.length === 0}
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

export default FormCreationDelivery;