"use client";

import { useEffect, useState } from "react";

function WeightPage() {
  const [weights, setWeights] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/weight/weights"
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          console.error(data);
          return;
        }

        setWeights(data.data);
      } catch (error) {
        console.error("Error al obtener los pesos:", error);
      }
    };

    fetchWeights();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Listar Pesos
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">ID Ovino</th>
                <th className="p-3">Peso (kg)</th>
                <th className="p-3">Notas</th>
                <th className="p-3">Activo</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {weights.map((weight: any, index: number) => (
                <tr
                  key={weight.id}
                  className={`border-b hover:bg-orange-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">{weight.id}</td>
                  <td className="p-3">
                    {new Date(weight.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{weight.id_ovine}</td>
                  <td className="p-3">{weight.weight}</td>
                  <td className="p-3">{weight.notes}</td>
                  <td
                    className={`p-3 font-semibold ${
                      weight.active ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {weight.active ? "Activo" : "Inactivo"}
                  </td>
                </tr>
              ))}

              {weights.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-gray-500">
                    No hay registros de peso.
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

export default WeightPage;