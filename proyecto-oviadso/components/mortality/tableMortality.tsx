"use client";

import { useEffect, useState } from "react";

interface TableMortalityProps {
  actions?: React.ReactNode;
}

function TableMortality({ actions }: TableMortalityProps) {
  const [mortalities, setMortalities] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMortalities, setTotalMortalities] = useState(0);

  // Buscador
  const [search, setSearch] = useState("");

  // Recargar tabla
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchMortalities = async () => {
      try {
        const limit = 10;
        const offset = (page - 1) * limit;

        const response = await fetch(
          `http://localhost:3001/api/mortality/mortalities?limit=${limit}&offset=${offset}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data);
          return;
        }

        const listaMortalidades = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.mortalities)
            ? data.mortalities
            : Array.isArray(data.mortalidades)
              ? data.mortalidades
              : Array.isArray(data)
                ? data
                : [];

        setMortalities(listaMortalidades);

        // El backend debe devolver el total real de mortalidades.
        const total = data.total ?? data.totalMortalities ?? data.count;

        if (typeof total === "number") {
          setTotalMortalities(total);

          const paginas = Math.max(1, Math.ceil(total / limit));
          setTotalPages(paginas);

          // Evitar permanecer en una página que ya no existe.
          if (page > paginas) {
            setPage(paginas);
          }
        } else {
          console.error(
            "La API debe devolver el total de mortalidades registradas."
          );
        }
      } catch (error) {
        console.error("Error al obtener las mortalidades:", error);
      }
    };

    fetchMortalities();
  }, [page, refresh]);

  // Filtrar mortalidades sin buscar por el ID del registro
  const filteredMortalities = mortalities.filter((mortality: any) => {
    if (!search.trim()) {
      return true;
    }

    const texto = search.toLowerCase().trim();

    return `${mortality.date} ${mortality.ovine_id} ${mortality.cause} ${mortality.description} ${mortality.postJob} ${mortality.active ? "activo" : "inactivo"}`
      .toLowerCase()
      .includes(texto);
  });

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
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-left">
          Mortalidades
        </h1>

        <div className="relative flex items-center justify-between">
          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar mortalidad..."
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
              <th className="px-6 py-4 font-medium">Causa</th>
              <th className="px-6 py-4 font-medium">Trabajo posterior</th>
              <th className="px-6 py-4 font-medium">Descripción</th>
              <th className="px-6 py-4 font-medium">Estado</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredMortalities.map((mortality: any) => (
              <tr
                key={mortality.id}
                className="transition-colors hover:bg-gray-50"
              >
                {/* FECHA */}
                <td className="px-6 py-4 text-gray-600">
                  {mortality.date
                    ? new Date(mortality.date).toLocaleDateString("es-CO")
                    : "Sin fecha"}
                </td>

                {/* OVINO */}
                <td className="px-6 py-4 text-gray-600">
                  {mortality.ovine_id}
                </td>

                {/* CAUSA */}
                <td className="px-6 py-4 text-gray-600">
                  {mortality.cause || "Sin dato"}
                </td>

                {/* TRABAJO POSTERIOR */}
                <td className="px-6 py-4 text-gray-600">
                  {mortality.postJob || "Sin dato"}
                </td>

                {/* DESCRIPCIÓN */}
                <td className="px-6 py-4 text-gray-600">
                  {mortality.description || "Sin dato"}
                </td>

                {/* ESTADO */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      mortality.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {mortality.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}

            {filteredMortalities.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {search
                    ? "No se encontraron mortalidades."
                    : "No hay mortalidades registradas."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINADOR */}
      <div className="max-w-7xl mx-auto mt-4 flex items-center justify-between px-2 text-sm text-gray-500">
        <span>Total de mortalidades: {totalMortalities}</span>

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

export default TableMortality;