"use client";

import { useCallback, useEffect, useState } from "react";

interface Health {
  id: number;
  date: string;
  ovine_id: number;
  diagnosis: string;
  treatment: string;
  postJob: string;
  observations: string;
  vaccine_id: number;
  vaccine_name: string;
  active: boolean;
}

interface TableHealthProps {
  actions?:
    | React.ReactNode
    | ((handleRefresh: () => void) => React.ReactNode);
}

function TableHealth({ actions }: TableHealthProps) {
  const [healths, setHealths] = useState<Health[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHealths, setTotalHealths] = useState(0);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);

  // Recargar tabla después de crear un registro
  const handleRefresh = useCallback(() => {
    setRefresh((previous) => previous + 1);
  }, []);

  useEffect(() => {
    const getHealths = async () => {
      try {
        const limit = 10;
        const offset = (page - 1) * limit;

        const response = await fetch(
          `http://localhost:3001/api/health/healths?limit=${limit}&offset=${offset}`
        );

        const data = await response.json();

        console.log("Respuesta de sanidad:", data);

        if (!response.ok) {
          console.error("Error de la API:", data);
          return;
        }

        const listaHealths = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.healths)
            ? data.healths
            : Array.isArray(data)
              ? data
              : [];

        const total = Number(
          data.total ??
          data.totalHealths ??
          data.count ??
          listaHealths.length
        );

        const paginas = Math.max(1, Math.ceil(total / limit));

        setTotalHealths(total);
        setTotalPages(paginas);

        // Si la página actual ya no existe, volver a la última
        if (page > paginas) {
          setPage(paginas);
          return;
        }

        setHealths(listaHealths);
      } catch (error) {
        console.error(
          "Error al obtener los registros de sanidad:",
          error
        );
      }
    };

    getHealths();
  }, [page, refresh]);

  // Buscar registros de sanidad
  const filteredHealths = healths.filter((health) => {
    const texto = search.toLowerCase().trim();

    if (!texto) {
      return true;
    }

    return [
      health.id,
      health.date,
      health.ovine_id,
      health.diagnosis,
      health.treatment,
      health.postJob,
      health.observations,
      health.vaccine_id,
      health.vaccine_name,
      health.active ? "activo" : "inactivo",
    ]
      .filter((value) => value !== undefined && value !== null)
      .join(" ")
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
          Sanidad
        </h1>

        <div className="relative flex items-center justify-between gap-3">
          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar registro de sanidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 max-w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />

          {/* BOTÓN DE CREACIÓN */}
          {typeof actions === "function"
            ? actions(handleRefresh)
            : actions}
        </div>
      </div>

      {/* TABLA SIN COLUMNA ID NI SCROLL HORIZONTAL */}
      <div className="max-w-7xl mx-auto rounded-lg border border-gray-200 shadow-sm bg-white">
        <table className="w-full table-fixed border-collapse text-left text-xs text-gray-800">
          <thead className="bg-gray-200 text-xs font-medium text-gray-500">
            <tr>
              <th className="w-[10%] px-2 py-3 font-medium">
                Fecha
              </th>
              <th className="w-[8%] px-2 py-3 font-medium">
                ID Ovino
              </th>
              <th className="w-[14%] px-2 py-3 font-medium">
                Diagnóstico
              </th>
              <th className="w-[12%] px-2 py-3 font-medium">
                Tratamiento
              </th>
              <th className="w-[12%] px-2 py-3 font-medium">
                Trabajo posterior
              </th>
              <th className="w-[15%] px-2 py-3 font-medium">
                Observaciones
              </th>
              <th className="w-[7%] px-2 py-3 font-medium">
                ID Vacuna
              </th>
              <th className="w-[14%] px-2 py-3 font-medium">
                Nombre de la vacuna
              </th>
              <th className="w-[8%] px-2 py-3 font-medium">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredHealths.map((health, index) => (
              <tr
                key={health.id ?? index}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="break-words px-2 py-3 text-gray-600">
                  {health.date
                    ? new Date(health.date).toLocaleDateString(
                        "es-CO",
                        { timeZone: "UTC" }
                      )
                    : "Sin fecha"}
                </td>

                <td className="break-words px-2 py-3 text-gray-600">
                  {health.ovine_id ?? "Sin dato"}
                </td>

                <td className="break-words px-2 py-3 text-gray-600">
                  {health.diagnosis ?? "Sin dato"}
                </td>

                <td className="break-words px-2 py-3 text-gray-600">
                  {health.treatment ?? "Sin dato"}
                </td>

                <td className="break-words px-2 py-3 text-gray-600">
                  {health.postJob ?? "Sin dato"}
                </td>

                <td className="break-words px-2 py-3 text-gray-600">
                  {health.observations ?? "Sin observaciones"}
                </td>

                <td className="break-words px-2 py-3 text-gray-600">
                  {health.vaccine_id ?? "Sin dato"}
                </td>

                <td className="break-words px-2 py-3 text-gray-600">
                  {health.vaccine_name ?? "Sin dato"}
                </td>

                <td className="px-2 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      health.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {health.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}

            {filteredHealths.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-2 py-8 text-center text-gray-500"
                >
                  {search
                    ? "No se encontraron registros de sanidad."
                    : "No hay registros de sanidad."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINADOR */}
      <div className="max-w-7xl mx-auto mt-4 flex items-center justify-between gap-3 px-2 text-sm text-gray-500">
        <span>
          Total de registros de sanidad: {totalHealths}
        </span>

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

          <span className="whitespace-nowrap text-gray-400">
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

export default TableHealth;