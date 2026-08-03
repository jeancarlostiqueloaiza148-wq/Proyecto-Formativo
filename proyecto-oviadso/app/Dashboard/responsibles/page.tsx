"use client";

import { useEffect, useState } from "react";

function ResponsiblePage() {
  const [responsibles, setResponsibles] = useState<any[]>([]);

  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/responsible/responsibles"
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          console.error(data);
          return;
        }

        setResponsibles(data.data);
      } catch (error) {
        console.error("Error al obtener los responsables:", error);
      }
    };

    fetchResponsibles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Tabla de Responsables
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Apellido</th>
                <th className="p-3">Documento</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Activo</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {responsibles.map((responsible: any, index: number) => (
                <tr
                  key={responsible.id}
                  className={`border-b hover:bg-orange-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">{responsible.name}</td>
                  <td className="p-3">{responsible.lastname}</td>
                  <td className="p-3">{responsible.document}</td>
                  <td className="p-3">{responsible.phone}</td>
                  <td className="p-3">{responsible.email}</td>
                  <td
                    className={`p-3 font-semibold ${
                      responsible.active
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {responsible.active ? "Activo" : "Inactivo"}
                  </td>
                </tr>
              ))}

              {responsibles.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-gray-500">
                    No hay responsables registrados.
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

export default ResponsiblePage;