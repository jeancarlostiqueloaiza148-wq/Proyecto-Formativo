"use client";

import { useEffect, useState } from "react";

function BirthPage() {
  const [births, setBirths] = useState<any[]>([]);

  useEffect(() => {
    const fetchBirths = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/birth/births"
        );

        const data = await response.json();

        console.log("Status:", response.status);
        console.log(data);

        if (!response.ok) {
          console.error(data);
          return;
        }

        setBirths(data.data);
      } catch (error) {
        console.error("Error al obtener los nacimientos:", error);
      }
    };

    fetchBirths();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Listar Nacimientos
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">

            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Ovino</th>
                <th className="p-3">Madre</th>
                <th className="p-3">Peso</th>
                <th className="p-3">Estado de Salud</th>
                <th className="p-3">Proceso</th>
                <th className="p-3">Observaciones</th>
                <th className="p-3">Activo</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {births.length > 0 ? (
                births.map((birth: any, index: number) => (
                  <tr
                    key={birth.id}
                    className={`border-b hover:bg-orange-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{birth.id}</td>

                    <td className="p-3">
                      {new Date(birth.date).toLocaleDateString("es-CO")}
                    </td>

                    <td className="p-3">{birth.ovine_id}</td>

                    <td className="p-3">{birth.mother_id}</td>

                    <td className="p-3">{birth.weight} kg</td>

                    <td className="p-3">{birth.status}</td>

                    <td className="p-3">{birth.postJob}</td>

                    <td className="p-3">{birth.notes}</td>

                    <td
                      className={`p-3 font-semibold ${
                        birth.active
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {birth.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-6 text-gray-500">
                    No hay nacimientos registrados.
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

export default BirthPage;