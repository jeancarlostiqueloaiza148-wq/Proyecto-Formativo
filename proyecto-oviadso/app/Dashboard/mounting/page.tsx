"use client";

import { useEffect, useState } from "react";

function MountingPage() {
  const [mountings, setMountings] = useState<any[]>([]);

  useEffect(() => {
    const fetchMountings = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/mounting/mountings"
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {
          setMountings(data.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMountings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Listar Montas
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full rounded-lg overflow-hidden shadow-md">

            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha Registro</th>
                <th className="p-3">Tipo de Monta</th>
                <th className="p-3">Macho Reproductor</th>
                <th className="p-3">Resultado</th>
                <th className="p-3">Activo</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">

              {mountings.length > 0 ? (

                mountings.map((mounting: any, index: number) => (

                  <tr
                    key={mounting.id}
                    className={`border-b hover:bg-orange-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >

                    <td className="p-3">{mounting.id}</td>

                    <td className="p-3">
                      {mounting.createdAt
                        ? new Date(mounting.createdAt).toLocaleDateString(
                            "es-CO"
                          )
                        : "Sin fecha"}
                    </td>

                    <td className="p-3">
                      {mounting.type_of_mounting}
                    </td>

                    <td className="p-3">
                      {mounting.breeding_male}
                    </td>

                    <td className="p-3">
                      {mounting.result_mounting}
                    </td>

                    <td
                      className={`p-3 font-semibold ${
                        mounting.active
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {mounting.active ? "Activo" : "Inactivo"}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan={6} className="p-6 text-gray-500">
                    No hay montas registradas.
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

export default MountingPage;