"use client";

import { useEffect, useState } from "react";

function DeliveryPage() {
  const [deliveries, setDeliveries] = useState<any[]>([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/delivery/deliveries"
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {
          setDeliveries(data.data);
        }
      } catch (error) {
        console.error("Error al obtener los partos:", error);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Listar Partos
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">

            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Madre</th>
                <th className="p-3">N° Crías</th>
                <th className="p-3">Tipo de Parto</th>
                <th className="p-3">Complicaciones</th>
                <th className="p-3">Proceso</th>
                <th className="p-3">Observaciones</th>
                <th className="p-3">Activo</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {deliveries.length > 0 ? (
                deliveries.map((delivery: any, index: number) => (
                  <tr
                    key={delivery.id}
                    className={`border-b hover:bg-orange-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{delivery.id}</td>

                    <td className="p-3">
                      {delivery.date
                        ? new Date(delivery.date).toLocaleDateString("es-CO")
                        : "Sin fecha"}
                    </td>

                    <td className="p-3">{delivery.mother_id}</td>

                    <td className="p-3">{delivery.number_of_offspring}</td>

                    <td className="p-3">{delivery.type_of_birth}</td>

                    <td className="p-3">
                      {delivery.complications || "Ninguna"}
                    </td>

                    <td className="p-3">{delivery.postJob}</td>

                    <td className="p-3">{delivery.notes}</td>

                    <td
                      className={`p-3 font-semibold ${
                        delivery.active
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {delivery.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-6 text-gray-500">
                    No hay partos registrados.
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

export default DeliveryPage;