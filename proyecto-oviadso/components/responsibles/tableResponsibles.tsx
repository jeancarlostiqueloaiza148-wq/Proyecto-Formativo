"use client";

import { useEffect, useState } from "react";

interface Responsible {
  id: number;
  name: string;
  lastname: string;
  document: string;
  phone: string;
  email: string;
  active: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TableResponsiblesProps {
  actions?: React.ReactNode;
}

function TableResponsibles({ actions }: TableResponsiblesProps) {
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [totalResponsibles, setTotalResponsibles] = useState(0);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // CARGAR RESPONSABLES
  useEffect(() => {
    const getResponsibles = async () => {
      try {
        setLoading(true);
        setError("");

        const offset = (page - 1) * 10;

        const response = await fetch(
          `http://localhost:3001/api/responsible/responsibles?limit=10&offset=${offset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("Responsables:", data);

        if (!response.ok) {
          throw new Error(
            data.message ||
              data.mensaje ||
              `Error HTTP: ${response.status}`,
          );
        }

        const listaResponsables =
          data.data ||
          data.responsibles ||
          data.responsables ||
          [];

        if (!Array.isArray(listaResponsables)) {
          setResponsibles([]);

          throw new Error(
            "La API no devolvió una lista de responsables",
          );
        }

        setResponsibles(listaResponsables);

        // Obtener el total real desde el backend
        const total =
          data.total ??
          data.pagination?.total ??
          data.meta?.total ??
          data.totalCount;

        if (typeof total !== "number") {
          throw new Error(
            "La API no devolvió el total de responsables. Revisa el controlador del backend.",
          );
        }

        const totalPaginas = Math.max(
          1,
          Math.ceil(total / 10),
        );

        setTotalResponsibles(total);

        setPagination({
          page,
          limit: 10,
          total,
          totalPages: totalPaginas,
        });

        // Si la página actual ya no existe, volver a la primera
        if (page > totalPaginas) {
          setPage(1);
        }
      } catch (error) {
        console.error(
          "Error al obtener responsables:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Error al obtener responsables",
        );
      } finally {
        setLoading(false);
      }
    };

    getResponsibles();
  }, [page, refresh]);

  // ACTUALIZAR DESPUÉS DE CREAR UN RESPONSABLE
  useEffect(() => {
    const actualizarResponsables = () => {
      setPage(1);
      setRefresh((valor) => valor + 1);
    };

    window.addEventListener(
      "responsibleCreated",
      actualizarResponsables,
    );

    return () => {
      window.removeEventListener(
        "responsibleCreated",
        actualizarResponsables,
      );
    };
  }, []);

  // FILTRAR RESPONSABLES
  const filteredResponsibles = responsibles.filter(
    (responsible) => {
      if (!search.trim()) {
        return true;
      }

      const texto = search.toLowerCase().trim();

      // Si se busca un número, buscar únicamente por ID
      if (!isNaN(Number(texto))) {
        return responsible.id === Number(texto);
      }

      // Buscar por los demás campos y el estado
      return `${responsible.name} ${responsible.lastname} ${responsible.document} ${responsible.phone} ${responsible.email} ${responsible.active ? "activo" : "inactivo"}`
        .toLowerCase()
        .includes(texto);
    },
  );

  // PÁGINA ANTERIOR
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // PÁGINA SIGUIENTE
  const nextPage = () => {
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen pt-12 px-6 pb-6">
      {/* ENCABEZADO */}
      <div className="mx-auto mb-4 max-w-7xl">
        <h1 className="mb-3 text-left text-xl font-bold text-gray-800">
          Responsables
        </h1>

        <div className="relative flex items-center justify-between gap-3">
          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar responsable..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />

          {/* BOTÓN / ACCIÓN */}
          {actions}
        </div>
      </div>

      {/* CARGANDO */}
      {loading && (
        <div className="mx-auto max-w-7xl overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            Cargando responsables...
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mx-auto mb-3 max-w-7xl rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* TABLA */}
      {!loading && !error && (
        <>
          <div className="mx-auto max-w-7xl overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-sm text-gray-800">
              <thead className="bg-gray-200 text-xs font-medium text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">
                    Nombre
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Apellido
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Documento
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Teléfono
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Correo
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredResponsibles.map((responsible) => (
                  <tr
                    key={responsible.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-600">
                      {responsible.name}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {responsible.lastname}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {responsible.document}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {responsible.phone}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {responsible.email}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          responsible.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {responsible.active
                          ? "Activo"
                          : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredResponsibles.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      {search
                        ? "No se encontraron responsables"
                        : "No hay responsables registrados."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINADOR */}
          <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between px-2 text-sm text-gray-500">
            <span>
              Total de responsables: {totalResponsibles}
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

              <span className="text-gray-400">
                Página {page} de {pagination.totalPages}
              </span>

              <button
                type="button"
                onClick={nextPage}
                disabled={page >= pagination.totalPages}
                className="flex items-center gap-1 transition-colors hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
                <span>→</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TableResponsibles;