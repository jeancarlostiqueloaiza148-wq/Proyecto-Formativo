"use client";

import { useEffect, useState } from "react";

function FeedingPage() {
  const [feedings, setFeedings] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeedings = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/feeding/feedings"
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          console.error(data);
          return;
        }

        setFeedings(data.data);
      } catch (error) {
        console.error("Error al obtener los registros de alimentación:", error);
      }
    };

    fetchFeedings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Listar Alimentaciones
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Ovino</th>
                <th className="p-3">Tipo de Alimento</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Proceso</th>
                <th className="p-3">Observaciones</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {feedings.length > 0 ? (
                feedings.map((feeding: any, index: number) => (
                  <tr
                    key={feeding.id}
                    className={`border-b hover:bg-orange-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{feeding.id}</td>

                    <td className="p-3">
                      {new Date(feeding.date).toLocaleDateString("es-CO")}
                    </td>

                    <td className="p-3">{feeding.ovine_id}</td>

                    <td className="p-3">{feeding.food_type}</td>

                    <td className="p-3">{feeding.quantity}</td>

                    <td className="p-3">{feeding.postJob}</td>

                    <td className="p-3">{feeding.notes}</td>

                    <td
                      className={`p-3 font-semibold ${
                        feeding.active
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {feeding.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-6 text-gray-500">
                    No hay registros de alimentación.
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

export default FeedingPage;