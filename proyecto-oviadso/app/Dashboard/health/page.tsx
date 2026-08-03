"use client";

import { useEffect, useState } from "react";

function HealthPage() {
  const [healths, setHealths] = useState<any[]>([]);

  useEffect(() => {
    const fetchHealths = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/health/healths"
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          console.error(data);
          return;
        }

        setHealths(data.data);
      } catch (error) {
        console.error("Error al obtener los registros de sanidad:", error);
      }
    };

    fetchHealths();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Tabla de Sanidad
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Ovino</th>
                <th className="p-3">Enfermedad</th>
                <th className="p-3">Tratamiento</th>
                <th className="p-3">Observaciones</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {healths.length > 0 ? (
                healths.map((health: any, index: number) => (
                  <tr
                    key={health.id}
                    className={`border-b hover:bg-orange-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{health.id}</td>
                    <td className="p-3">{health.date}</td>
                    <td className="p-3">{health.ovine_id}</td>
                    <td className="p-3">{health.disease}</td>
                    <td className="p-3">{health.treatment}</td>
                    <td className="p-3">{health.observations}</td>
                    <td
                      className={`p-3 font-semibold ${
                        health.active
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {health.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-6 text-gray-500">
                    No hay registros de sanidad.
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

export default HealthPage;