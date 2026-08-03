"use client";

import { useEffect, useState } from "react";

function OvinePage() {
  const [ovines, setOvines] = useState<any[]>([]);

  useEffect(() => {
    const fetchOvines = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/ovine/ovines"
        );

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          console.error(data);
          return;
        }

        setOvines(data.data);
      } catch (error) {
        console.error("Error al obtener los ovinos:", error);
      }
    };

    fetchOvines();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Tabla de Ovinos
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden shadow-md">

            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Identificación</th>
                <th className="p-3">Raza</th>
                <th className="p-3">Sexo</th>
                <th className="p-3">Fecha de Nacimiento</th>
                <th className="p-3">Peso</th>
                <th className="p-3">Estado de Salud</th>
                <th className="p-3">Activo</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700">
              {ovines.length > 0 ? (
                ovines.map((ovine: any, index: number) => (
                  <tr
                    key={ovine.id}
                    className={`border-b hover:bg-orange-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{ovine.id}</td>

                    <td className="p-3">{ovine.name}</td>

                    <td className="p-3">{ovine.tag}</td>

                    <td className="p-3">{ovine.breed}</td>

                    <td className="p-3">{ovine.sex}</td>

                    <td className="p-3">
                      {ovine.birth_date}
                    </td>

                    <td className="p-3">{ovine.weight} kg</td>

                    <td className="p-3">{ovine.status}</td>

                    <td
                      className={`p-3 font-semibold ${
                        ovine.active
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {ovine.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-6 text-gray-500">
                    No hay ovinos registrados.
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

export default OvinePage;