export default function TableUser() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 border-t-4 border-orange-500">

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Tabla de Usuarios
        </h1>


        <div className="overflow-x-auto">

          <table className="w-full rounded-lg overflow-hidden shadow-md">


            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3">Usuario</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>


            <tbody className="text-center text-gray-700">


              <tr className="border-b hover:bg-orange-50 transition">
                <td className="p-3">JuanPerez</td>
                <td className="p-3">juan@gmail.com</td>
                <td className="p-3">Administrador</td>
                <td className="p-3 text-green-600 font-bold">
                  Activo
                </td>
              </tr>


              <tr className="border-b hover:bg-orange-50 transition bg-gray-50">
                <td className="p-3">MariaLopez</td>
                <td className="p-3">maria@gmail.com</td>
                <td className="p-3">Usuario</td>
                <td className="p-3 text-red-600 font-bold">
                  Inactivo
                </td>
              </tr>


              <tr className="border-b hover:bg-orange-50 transition">
                <td className="p-3">CarlosGomez</td>
                <td className="p-3">carlos@gmail.com</td>
                <td className="p-3">Editor</td>
                <td className="p-3 text-green-600 font-bold">
                  Activo
                </td>
              </tr>


            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}