function FormCreationUser() {
  return (
    <div className="flex w-full justify-center">
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

          {/* ROL */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Rol:
            </label>

            <select
              id="role"
              name="role"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione un rol 
              </option>

              <option value="Administrador">Administrador</option>

              <option value="Veterinario">Veterinario</option>

              <option value="Aprendiz">Aprendiz</option>

              <option value="Instructor">Instructor</option>
            </select>
          </div>

          {/* ESTADO */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Estado:
            </label>

            <select
              id="status"
              name="status"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione un estado
              </option>

              <option value="Activo">Activo</option>

              <option value="Inactivo">Inactivo</option>
            </select>
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