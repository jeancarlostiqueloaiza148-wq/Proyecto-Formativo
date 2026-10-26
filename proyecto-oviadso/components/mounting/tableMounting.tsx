"use client";

import { useEffect, useState } from "react";

interface Mounting {
  id: number;
  type_of_mounting: string;
  result_mounting: string;
  breeding_male: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TableMountingProps {
  actions?: React.ReactNode | ((handleRefresh: () => void) => React.ReactNode);
}

function TableMounting({ actions }: TableMountingProps) {
  const [mountings, setMountings] = useState<Mounting[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMountings, setTotalMountings] = useState(0);

  // Buscador
  const [search, setSearch] = useState("");

  // Recargar tabla
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    const getMountings = async () => {
      try {
        const limit = 10;
        const offset = (page - 1) * limit;

        const response = await fetch(
          `http://localhost:3001/api/mounting/mountings?limit=${limit}&offset=${offset}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Error al obtener las montas:", data);
          return;
        }

        const listaMontas = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.mountings)
            ? data.mountings
            : Array.isArray(data)
              ? data
              : [];

        setMountings(listaMontas);

        // Obtener el total real de montas
        const total = Number(
          data.total ?? data.totalMountings ?? data.count ?? 0
        );

        setTotalMountings(total);

        const paginas = Math.max(1, Math.ceil(total / limit));
        setTotalPages(paginas);

        // Actualizar la página si ya no existe
        if (page > paginas) {
          setPage(paginas);
        }
      } catch (error) {
        console.error("Error al obtener las montas:", error);
      }
    };

    getMountings();
  }, [page, refresh]);

  // Filtrar montas
  const filteredMountings = mountings.filter((mounting) =>
    `${mounting.id} ${mounting.type_of_mounting} ${mounting.result_mounting} ${mounting.breeding_male} ${mounting.active ? "activo" : "inactivo"}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  // Página anterior
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Página siguiente
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen pt-12 px-6 pb-6">
      {/* ENCABEZADO */}
      <div className="mx-auto mb-4 max-w-7xl">
        <h1 className="mb-3 text-left text-2xl font-bold text-gray-800">
          Montas
        </h1>

        <div className="relative flex items-center justify-between">
          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar monta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />

          {/* BOTÓN / ACCIÓN */}
          {typeof actions === "function"
            ? actions(handleRefresh)
            : actions}
        </div>
      </div>

      {/* TABLA */}
      <div className="mx-auto max-w-7xl overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-gray-800">
          <thead className="bg-gray-200 text-xs font-medium text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">
                Tipo de Monta
              </th>
              <th className="px-4 py-3 font-medium">
                Resultado
              </th>
              <th className="px-4 py-3 font-medium">
                Macho Reproductor
              </th>
              <th className="px-4 py-3 font-medium">
                Fecha de Creación
              </th>
              <th className="px-4 py-3 font-medium">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredMountings.map((mounting) => (
              <tr
                key={mounting.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-600">
                  {mounting.type_of_mounting}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {mounting.result_mounting}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {mounting.breeding_male}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {mounting.createdAt
                    ? new Date(mounting.createdAt).toLocaleDateString(
                        "es-CO"
                      )
                    : "Sin fecha"}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      mounting.active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {mounting.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}

            {filteredMountings.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No hay montas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINADOR */}
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between px-2 text-sm text-gray-500">
        <span>Total de montas: {totalMountings}</span>

        <div className="flex items-center gap-4">
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

export default TableMounting;