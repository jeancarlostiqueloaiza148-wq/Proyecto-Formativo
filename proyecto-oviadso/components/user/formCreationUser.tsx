function FormCreationUser() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500">

        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Crear Usuario
        </h2>


        <form className="space-y-5">


          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Nombre de usuario:
            </label>

            <input
              type="text"
              id="username"
              name="username"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>


          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Correo electrónico:
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>


          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Contraseña:
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>


          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Rol:
            </label>

            <input
              type="text"
              id="role"
              name="role"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>


          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Estado:
            </label>

            <input
              type="text"
              id="status"
              name="status"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition duration-300 shadow-md"
          >
            Crear Usuario
          </button>


        </form>

      </div>

    </div>
  );
}

export default FormCreationUser;