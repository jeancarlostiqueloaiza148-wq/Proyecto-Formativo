"use client";

import { useEffect, useState } from "react";

interface FormCreationOvineProps {
  onClose?: () => void;
}

interface Ovine {
  id: number;
  tag: string;
}

function FormCreationOvine({ onClose }: FormCreationOvineProps) {
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
        setError("No se pudieron cargar las etiquetas existentes");
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

  // Obtener las etiquetas existentes
  const existingTags = ovines.map((ovine) =>
    String(ovine.tag).trim().replace(/^0+/, "")
  );

  // Generar etiquetas automáticamente
  const availableTags = Array.from(
    { length: ovines.length + 11 },
    (_, index) => String(index + 1).padStart(3, "0")
  ).filter(
    (tag) => !existingTags.includes(tag.replace(/^0+/, ""))
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      tag: formData.get("tag"),
      breed: formData.get("breed"),
      sex: formData.get("sex"),
      birth_date: formData.get("birth_date"),
      weight: Number(formData.get("weight")),
      health_status: formData.get("health_status"),
      status: "Activo",
      active: true,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/ovine/ovines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      console.log("Respuesta crear ovino:", result);

      if (!response.ok) {
        setError(
          result.message ||
            result.mensaje ||
            "No se pudo crear el ovino"
        );
        return;
      }

      alert("Ovino creado correctamente");

      form.reset();

      closeForm();
    } catch (error) {
      console.error("Error al crear el ovino:", error);
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
        + Crear Ovino
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* ENCABEZADO */}
            <div className="flex items-center justify-between bg-gray-200 px-5 py-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Crear Ovino
                </h2>

                <p className="text-sm text-gray-500">
                  Registra la información del nuevo ovino
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

                {/* ETIQUETA */}
                <div>
                  <label
                    htmlFor="tag"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Etiqueta
                  </label>

                  <select
                    id="tag"
                    name="tag"
                    defaultValue=""
                    required
                    disabled={
                      loadingOvines ||
                      !!error ||
                      availableTags.length === 0
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500 disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {loadingOvines
                        ? "Cargando etiquetas..."
                        : error
                          ? "Error al cargar etiquetas"
                          : availableTags.length === 0
                            ? "No hay etiquetas disponibles"
                            : "Seleccione una etiqueta"}
                    </option>

                    {availableTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>

                {/* RAZA */}
                <div>
                  <label
                    htmlFor="breed"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Raza
                  </label>

                  <select
                    id="breed"
                    name="breed"
                    defaultValue=""
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      Seleccione una raza
                    </option>
                    <option value="Pelibuey">Pelibuey</option>
                    <option value="Santa Inés">Santa Inés</option>
                    <option value="Katahdin">Katahdin</option>
                  </select>
                </div>

                {/* SEXO */}
                <div>
                  <label
                    htmlFor="sex"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Sexo
                  </label>

                  <select
                    id="sex"
                    name="sex"
                    defaultValue=""
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      Seleccione un sexo
                    </option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </div>

                {/* FECHA DE NACIMIENTO */}
                <div>
                  <label
                    htmlFor="birth_date"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Fecha de Nacimiento
                  </label>

                  <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* PESO */}
                <div>
                  <label
                    htmlFor="weight"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Peso
                  </label>

                  <select
                    id="weight"
                    name="weight"
                    defaultValue=""
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      Seleccione un peso
                    </option>
                    <option value="10">10 kg</option>
                    <option value="20">20 kg</option>
                    <option value="30">30 kg</option>
                    <option value="40">40 kg</option>
                  </select>
                </div>

                {/* ESTADO DE SALUD */}
                <div>
                  <label
                    htmlFor="health_status"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Estado de Salud
                  </label>

                  <select
                    id="health_status"
                    name="health_status"
                    defaultValue=""
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      Seleccione el estado de salud
                    </option>
                    <option value="Saludable">Saludable</option>
                    <option value="En tratamiento">En tratamiento</option>
                    <option value="Enfermo">Enfermo</option>
                  </select>
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
                    availableTags.length === 0
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

export default FormCreationOvine;