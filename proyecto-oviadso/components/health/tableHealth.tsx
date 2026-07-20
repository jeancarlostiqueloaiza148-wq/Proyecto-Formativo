export default function TableHealth() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">


        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Tabla de Salud
        </h1>


        <div className="overflow-x-auto">

          <table className="w-full rounded-lg overflow-hidden shadow-md">


            <thead className="bg-orange-500 text-white">

              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">ID Ganado</th>
                <th className="p-3">Diagnóstico</th>
                <th className="p-3">Tratamiento</th>
                <th className="p-3">Observaciones</th>
              </tr>

            </thead>



            <tbody className="text-center text-gray-700">


              <tr className="border-b hover:bg-orange-50 transition">

                <td className="p-3">1</td>
                <td className="p-3">09/06/2026</td>
                <td className="p-3">101</td>
                <td className="p-3">Fiebre</td>
                <td className="p-3">Medicamento veterinario</td>
                <td className="p-3">Revisión en 7 días</td>

              </tr>




              <tr className="border-b hover:bg-orange-50 transition bg-gray-50">

                <td className="p-3">2</td>
                <td className="p-3">08/06/2026</td>
                <td className="p-3">102</td>
                <td className="p-3">Infección</td>
                <td className="p-3">Antibiótico</td>
                <td className="p-3">Mejoría del animal</td>

              </tr>





              <tr className="hover:bg-orange-50 transition">

                <td className="p-3">3</td>
                <td className="p-3">07/06/2026</td>
                <td className="p-3">103</td>
                <td className="p-3">Herida</td>
                <td className="p-3">Limpieza y curación</td>
                <td className="p-3">Control veterinario</td>

              </tr>


            </tbody>


          </table>

        </div>

      </div>

    </div>
  );
}