"use client";

import { useEffect, useState } from "react";

function UserPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user/users");

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          console.error(data);
          return;
        }

        setUsers(data.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Tabla de Usuarios
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">Nombre de Usuario</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Cargo</th>
                <th className="p-3">Verificación</th>
                <th className="p-3">Activo</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {users.map((user: any, index: number) => (
                <tr
                  key={user.id}
                  className={`border-b hover:bg-orange-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.postJob}</td>
                  <td className="p-3">
                    {user.verifyEmail ? "Sí" : "No"}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      user.active ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.active ? "Activo" : "Inactivo"}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-gray-500">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserPage;