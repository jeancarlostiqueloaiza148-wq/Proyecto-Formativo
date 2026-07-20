export default function TableResponsibles() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Tabla de Responsables
        </h1>


        <div className="overflow-x-auto">

          <table className="w-full rounded-lg overflow-hidden shadow-md">


            <thead className="bg-orange-500 text-white">

              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Apellido</th>
                <th className="p-3">Documento</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Correo</th>
              </tr>

            </thead>


            <tbody className="text-center text-gray-700">


              <tr className="border-b hover:bg-orange-50 transition">

                <td className="p-3">1</td>
                <td className="p-3">Juan</td>
                <td className="p-3">Pérez</td>
                <td className="p-3">123456789</td>
                <td className="p-3">3001234567</td>
                <td className="p-3">juan.perez@gmail.com</td>

              </tr>



              <tr className="border-b hover:bg-orange-50 transition bg-gray-50">

                <td className="p-3">2</td>
                <td className="p-3">María</td>
                <td className="p-3">López</td>
                <td className="p-3">987654321</td>
                <td className="p-3">3019876543</td>
                <td className="p-3">maria.lopez@gmail.com</td>

              </tr>



              <tr className="hover:bg-orange-50 transition">

                <td className="p-3">3</td>
                <td className="p-3">Carlos</td>
                <td className="p-3">Gómez</td>
                <td className="p-3">456789123</td>
                <td className="p-3">3024567890</td>
                <td className="p-3">carlos.gomez@gmail.com</td>

              </tr>


            </tbody>


          </table>

        </div>

      </div>

    </div>
  );
}