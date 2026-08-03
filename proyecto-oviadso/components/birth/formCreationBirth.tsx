function FormCreationBirth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500">
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Crear Nacimiento
        </h2>

        <form className="space-y-5">
          {/* FECHA */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Fecha:
            </label>

            <input
              type="date"
              id="date"
              name="date"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* ID OVINO*/}
          <div>
            <label
              htmlFor="livestock_id"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              ID Ovino:
            </label>

            <select
              id="livestock_id"
              name="livestock_id"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione un ovino
              </option>

              <option value="1">Ovino 1</option>
              <option value="2">Ovino 2</option>
              <option value="3">Ovino 3</option>
            </select>
          </div>

          {/* ID MADRE */}
          <div>
            <label
              htmlFor="mother_id"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              ID Madre:
            </label>

            <select
              id="mother_id"
              name="mother_id"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione una madre
              </option>

              <option value="1">Madre 1</option>
              <option value="2">Madre 2</option>
              <option value="3">Madre 3</option>
            </select>
          </div>

          {/* PESO */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Peso:
            </label>

            <input
              type="number"
              id="weight"
              name="weight"
              step="0.01"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
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

          {/* NOTAS */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Notas:
            </label>

            <input
              type="text"
              id="notes"
              name="notes"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition duration-300 shadow-md"
          >
            Crear Nacimiento
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCreationBirth;
