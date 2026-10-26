"use client";

import { useEffect, useState } from "react";

interface TableFeedingProps {
  actions?: React.ReactNode;
}

function TableFeeding({ actions }: TableFeedingProps) {
  const [feedings, setFeedings] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFeedings, setTotalFeedings] = useState(0);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchFeedings = async () => {
      try {
        const limit = 10;
        const offset = (page - 1) * limit;

        const response = await fetch(
          `http://localhost:3001/api/feeding/feedings?limit=${limit}&offset=${offset}`
        );

        const result = await response.json();

        console.log("Respuesta de alimentación:", result);

        if (!response.ok) {
          console.error("Error de la API:", result);
          return;
        }

        const listaAlimentaciones = Array.isArray(result.data)
          ? result.data
          : [];

        setFeedings(listaAlimentaciones);

        const total = Number(result.total ?? 0);
        setTotalFeedings(total);

        const paginas = Math.max(1, Math.ceil(total / limit));
        setTotalPages(paginas);

        if (page > paginas) {
          setPage(paginas);
        }
      } catch (error) {
        console.error(
          "Error al obtener las alimentaciones:",
          error
        );
      }
    };

    fetchFeedings();
  }, [page, refresh]);

  // BUSCADOR
  const filteredFeedings = feedings.filter((feeding: any) => {
    const texto = search.toLowerCase().trim();

    if (!texto) {
      return true;
    }

    return [
      feeding.id,
      feeding.date,
      feeding.ovine_id,
      feeding.food_type,
      feeding.quantity,
      feeding.postJob,
      feeding.notes,
      feeding.active ? "activo" : "inactivo",
    ]
      .filter((value) => value !== undefined && value !== null)
      .join(" ")
      .toLowerCase()
      .includes(texto);
  });

  // PÁGINA ANTERIOR
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // PÁGINA SIGUIENTE
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen pt-12 px-6 pb-6">
      {/* ENCABEZADO */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-left">
          Alimentaciones
        </h1>

        <div className="relative flex items-center justify-between">
          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar alimentación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />

          {/* BOTÓN / ACCIÓN */}
          {actions}
        </div>
      </div>

      {/* TABLA */}
      <div className="max-w-7xl mx-auto overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
        <table className="w-full border-collapse text-left text-sm text-gray-800">
          <thead className="bg-gray-200 text-xs font-medium text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium">Ovino</th>
              <th className="px-6 py-4 font-medium">
                Tipo de alimento
              </th>
              <th className="px-6 py-4 font-medium">Cantidad</th>
              <th className="px-6 py-4 font-medium">
                Trabajo posterior
              </th>
              <th className="px-6 py-4 font-medium">Observaciones</th>
              <th className="px-6 py-4 font-medium">Estado</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredFeedings.map((feeding: any, index: number) => (
              <tr
                key={feeding.id ?? index}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-gray-600">
                  {feeding.date ?? "Sin dato"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {feeding.ovine_id ?? "Sin dato"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {feeding.food_type ?? "Sin dato"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {feeding.quantity ?? "Sin dato"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {feeding.postJob ?? "Sin dato"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {feeding.notes ?? "Sin observaciones"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      feeding.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {feeding.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}

            {filteredFeedings.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No hay alimentaciones para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINADOR */}
      <div className="max-w-7xl mx-auto mt-4 flex items-center justify-between px-2 text-sm text-gray-500">
        <span>Total de alimentaciones: {totalFeedings}</span>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={previousPage}
            disabled={page === 1}
            className="flex items-center gap-1 transition-colors hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>←</span>
            Anterior
          </button>

          <span className="text-gray-400">
            Página {page} de {totalPages}
          </span>

          <button
            type="button"
            onClick={nextPage}
            disabled={page >= totalPages}
            className="flex items-center gap-1 transition-colors hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableFeeding;