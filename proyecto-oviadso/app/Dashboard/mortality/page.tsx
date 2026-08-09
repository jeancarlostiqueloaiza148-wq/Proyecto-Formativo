"use client";

import { useEffect, useState } from "react";

function MortalityPage() {
  const [mortalities, setMortalities] = useState<any[]>([]);

  useEffect(() => {
    const fetchMortalities = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/mortality/mortalities"
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          console.error(data);
          return;
        }

        setMortalities(data.data);
      } catch (error) {
        console.error("Error al obtener las mortalidades:", error);
      }
    };

    fetchMortalities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Listar Mortalidades
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Ovino</th>
                <th className="p-3">Causa</th>
                <th className="p-3">Proceso</th>
                <th className="p-3">Descripción</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {mortalities.length > 0 ? (
                mortalities.map((mortality: any, index: number) => (
                  <tr
                    key={mortality.id}
                    className={`border-b hover:bg-orange-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{mortality.id}</td>
                    <td className="p-3">{mortality.date}</td>
                    <td className="p-3">{mortality.ovine_id}</td>
                    <td className="p-3">{mortality.cause}</td>
                    <td className="p-3">{mortality.postJob}</td>
                    <td className="p-3">{mortality.description}</td>
                    <td
                      className={`p-3 font-semibold ${
                        mortality.active
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {mortality.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-6 text-gray-500">
                    No hay mortalidades registradas.
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

export default MortalityPage;