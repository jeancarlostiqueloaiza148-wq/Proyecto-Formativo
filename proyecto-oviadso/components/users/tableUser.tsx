"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  id_rol: number;
  postJob: string;
  verifyEmail: boolean;
  active: boolean;
  status: boolean;
  documentId: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TableUserProps {
  actions?: React.ReactNode;
}

function TableUser({ actions }: TableUserProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // Cargar usuarios
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const offset = (page - 1) * 10;

        const response = await fetch(
          `http://localhost:3001/api/user/users?limit=10&offset=${offset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || `Error HTTP: ${response.status}`
          );
        }

        const listaUsuarios =
          data.data ||
          data.users ||
          data;

        if (!Array.isArray(listaUsuarios)) {
          throw new Error(
            "La API no devolvió una lista de usuarios"
          );
        }

        setUsers(listaUsuarios);

        // Obtener el total real que devuelve el backend
        const total =
          data.pagination?.total ??
          data.meta?.total ??
          data.total ??
          data.totalCount;

        const totalReal =
          typeof total === "number"
            ? total
            : (page - 1) * 10 + listaUsuarios.length;

        const totalPaginas = Math.max(
          1,
          Math.ceil(totalReal / 10)
        );

        setTotalUsers(totalReal);

        setPagination({
          page,
          limit: 10,
          total: totalReal,
          totalPages: totalPaginas,
        });
      } catch (error) {
        console.error(
          "Error al obtener los usuarios:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Error al obtener los usuarios"
        );
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [page]);

  // Actualizar la tabla cuando se cree un usuario
  useEffect(() => {
    const actualizarUsuarios = () => {
      setPage(1);

      // Forzar una nueva consulta aunque ya estemos en la página 1
      const cargarUsuarios = async () => {
        try {
          setLoading(true);
          setError("");

          const response = await fetch(
            "http://localhost:3001/api/user/users?limit=10&offset=0",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message || `Error HTTP: ${response.status}`
            );
          }

          const listaUsuarios =
            data.data ||
            data.users ||
            data;

          if (!Array.isArray(listaUsuarios)) {
            throw new Error(
              "La API no devolvió una lista de usuarios"
            );
          }

          setUsers(listaUsuarios);

          const total =
            data.pagination?.total ??
            data.meta?.total ??
            data.total ??
            data.totalCount;

          const totalReal =
            typeof total === "number"
              ? total
              : listaUsuarios.length;

          setTotalUsers(totalReal);

          setPagination({
            page: 1,
            limit: 10,
            total: totalReal,
            totalPages: Math.max(
              1,
              Math.ceil(totalReal / 10)
            ),
          });
        } catch (error) {
          console.error(
            "Error al actualizar los usuarios:",
            error
          );

          setError(
            error instanceof Error
              ? error.message
              : "Error al actualizar los usuarios"
          );
        } finally {
          setLoading(false);
        }
      };

      cargarUsuarios();
    };

    window.addEventListener(
      "userCreated",
      actualizarUsuarios
    );

    return () => {
      window.removeEventListener(
        "userCreated",
        actualizarUsuarios
      );
    };
  }, []);

  // Filtrar usuarios
  const filteredUsers = users.filter((user) => {
    if (!search.trim()) {
      return true;
    }

    const texto = search.toLowerCase().trim();

    if (!isNaN(Number(texto))) {
      return user.id === Number(texto);
    }

    return `${user.username} ${user.email} ${user.postJob} ${user.documentId}`
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
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen pt-12 px-6 pb-6">
      {/* ENCABEZADO */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-left">
          Usuarios
        </h1>

        <div className="relative flex items-center justify-between">
          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />

          {/* BOTÓN CREAR USUARIO */}
          {actions}
        </div>
      </div>

      {/* CARGANDO */}
      {loading && (
        <p className="max-w-7xl mx-auto text-gray-500">
          Cargando usuarios...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <div className="max-w-7xl mx-auto mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* TABLA */}
          <div className="max-w-7xl mx-auto overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
            <table className="w-full border-collapse text-left text-sm text-gray-800">
              <thead className="bg-gray-200 text-xs font-medium text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Usuario</th>
                  <th className="px-6 py-4 font-medium">Correo</th>
                  <th className="px-6 py-4 font-medium">ID Rol</th>
                  <th className="px-6 py-4 font-medium">Cargo</th>
                  <th className="px-6 py-4 font-medium">Documento</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      {search
                        ? "No se encontraron usuarios"
                        : "No hay usuarios registrados."}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.username}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.id_rol}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.postJob}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.documentId}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINADOR */}
          <div className="max-w-7xl mx-auto mt-4 flex items-center justify-between px-2 text-sm text-gray-500">
            <span>Total de usuarios: {totalUsers}</span>

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

export default TableUser;