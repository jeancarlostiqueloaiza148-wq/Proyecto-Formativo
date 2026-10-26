
"use client";

import { cloneElement, isValidElement, useEffect, useState } from "react";

interface Delivery {
  id: number;
  date: string;
  mother_id: number;
  number_of_offspring: number;
  type_of_birth: string;
  complications: string;
  postJob: string;
  status: string;
  notes: string;
  active: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TableDeliveryProps {
  actions?: React.ReactNode;
}

function TableDelivery({ actions }: TableDeliveryProps) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    const getDeliveries = async () => {
      try {
        setLoading(true);
        setError("");

        const limit = 10;
        const offset = (page - 1) * limit;

        const response = await fetch(
          `http://localhost:3001/api/delivery/deliveries?limit=${limit}&offset=${offset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("Partos:", data);

        if (!response.ok) {
          throw new Error(
            data.message || `Error HTTP: ${response.status}`
          );
        }

        if (Array.isArray(data.data)) {
          const total = Number(
            data.total ?? data.pagination?.total ?? 0
          );

          const totalPages = Math.max(1, Math.ceil(total / limit));

          setDeliveries(data.data);

          setPagination({
            page,
            limit,
            total,
            totalPages,
          });

          // Si la página actual ya no existe, regresar a la última página.
          if (page > totalPages) {
            setPage(totalPages);
          }
        } else {
          setDeliveries([]);
          throw new Error("La API no devolvió una lista de partos");
        }
      } catch (error) {
        console.error("Error al obtener partos:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Error al obtener partos"
        );
      } finally {
        setLoading(false);
      }
    };

    getDeliveries();
  }, [page, refresh]);

  // ACTUALIZAR LA TABLA AL CERRAR EL FORMULARIO
  const actionsWithRefresh = isValidElement(actions)
    ? cloneElement(
        actions as React.ReactElement<{ onClose?: () => void }>,
        {
          onClose: () => {
            setRefresh((previous) => previous + 1);
          },
        }
      )
    : actions;

  // FILTRAR PARTOS
  const filteredDeliveries = deliveries.filter((delivery) => {
    if (!search.trim()) {
      return true;
    }

    const texto = search.toLowerCase().trim();

    if (!isNaN(Number(texto))) {
      return delivery.id === Number(texto);
    }

    return `${delivery.date} ${delivery.mother_id} ${delivery.number_of_offspring} ${delivery.type_of_birth} ${delivery.complications} ${delivery.postJob} ${delivery.status} ${delivery.notes} ${delivery.active ? "activo" : "inactivo"}`
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
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen pt-12 px-3 pb-6">
      {/* ENCABEZADO */}
      <div className="mx-auto mb-4 max-w-7xl">
        <h1 className="mb-3 text-left text-2xl font-bold text-gray-800">
          Partos
        </h1>

        <div className="relative flex items-center justify-between">
          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar parto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />

          {/* BOTÓN / ACCIÓN */}
          {actionsWithRefresh}
        </div>
      </div>

      {/* CARGANDO */}
      {loading && (
        <div className="mx-auto max-w-7xl rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="px-3 py-4 text-center text-sm text-gray-500">
            Cargando partos...
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mx-auto mb-4 max-w-7xl rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* TABLA */}
      {!loading && !error && (
        <>
          <div className="mx-auto max-w-7xl rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full table-fixed border-collapse text-left text-xs text-gray-800">
              <thead className="bg-gray-200 font-medium text-gray-500">
                <tr>
                  <th className="w-[9%] break-words px-2 py-2 font-medium">
                    Fecha
                  </th>
                  <th className="w-[8%] break-words px-2 py-2 font-medium">
                    ID Madre
                  </th>
                  <th className="w-[10%] break-words px-2 py-2 font-medium">
                    Número de Crías
                  </th>
                  <th className="w-[11%] break-words px-2 py-2 font-medium">
                    Tipo de Parto
                  </th>
                  <th className="w-[13%] break-words px-2 py-2 font-medium">
                    Complicaciones
                  </th>
                  <th className="w-[14%] break-words px-2 py-2 font-medium">
                    Trabajo posterior
                  </th>
                  <th className="w-[13%] break-words px-2 py-2 font-medium">
                    Estado del parto
                  </th>
                  <th className="w-[14%] break-words px-2 py-2 font-medium">
                    Notas
                  </th>
                  <th className="w-[8%] break-words px-2 py-2 font-medium">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredDeliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="break-words px-2 py-2 align-top text-gray-600">
                      {delivery.date
                        ? new Date(delivery.date).toLocaleDateString("es-CO")
                        : "Sin fecha"}
                    </td>

                    <td className="break-words px-2 py-2 align-top text-gray-600">
                      {delivery.mother_id}
                    </td>

                    <td className="break-words px-2 py-2 align-top text-gray-600">
                      {delivery.number_of_offspring}
                    </td>

                    <td className="break-words px-2 py-2 align-top text-gray-600">
                      {delivery.type_of_birth}
                    </td>

                    <td className="break-words px-2 py-2 align-top text-gray-600">
                      {delivery.complications || "Ninguna"}
                    </td>

                    <td className="break-words px-2 py-2 align-top text-gray-600">
                      {delivery.postJob || "Sin información"}
                    </td>

                    <td className="break-words px-2 py-2 align-top text-gray-600">
                      {delivery.status || "Sin estado"}
                    </td>

                    <td className="break-words px-2 py-2 align-top text-gray-600">
                      {delivery.notes || "Sin notas"}
                    </td>

                    <td className="break-words px-2 py-2 align-top">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          delivery.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {delivery.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredDeliveries.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-2 py-4 text-center text-gray-500"
                    >
                      {search
                        ? "No se encontraron partos"
                        : "No hay partos registrados."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINADOR */}
          <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between px-2 text-xs text-gray-500">
            <span>Total de partos: {pagination.total}</span>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={previousPage}
                disabled={page <= 1}
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

export default TableDelivery;