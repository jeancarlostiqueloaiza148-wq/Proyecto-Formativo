export default function TableFeeding() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">


        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Tabla de Alimentación
        </h1>


        <div className="overflow-x-auto">

          <table className="w-full rounded-lg overflow-hidden shadow-md">


            <thead className="bg-orange-500 text-white">

              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">ID Ganado</th>
                <th className="p-3">Tipo de Alimento</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Notas</th>
              </tr>

            </thead>



            <tbody className="text-center text-gray-700">


              <tr className="border-b hover:bg-orange-50 transition">

                <td className="p-3">1</td>
                <td className="p-3">09/06/2026</td>
                <td className="p-3">101</td>
                <td className="p-3">Pasto</td>
                <td className="p-3 font-semibold">5 kg</td>
                <td className="p-3">
                  Alimentación diaria
                </td>

              </tr>



              <tr className="border-b hover:bg-orange-50 transition bg-gray-50">

                <td className="p-3">2</td>
                <td className="p-3">08/06/2026</td>
                <td className="p-3">102</td>
                <td className="p-3">Concentrado</td>
                <td className="p-3 font-semibold">3 kg</td>
                <td className="p-3">
                  Complemento nutricional
                </td>

              </tr>



              <tr className="hover:bg-orange-50 transition">

                <td className="p-3">3</td>
                <td className="p-3">07/06/2026</td>
                <td className="p-3">103</td>
                <td className="p-3">Heno</td>
                <td className="p-3 font-semibold">4 kg</td>
                <td className="p-3">
                  Buena aceptación
                </td>

              </tr>


            </tbody>


          </table>

        </div>

      </div>

    </div>
  );
}