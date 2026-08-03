function FormCreationOvine() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500">
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Crear Ovino
        </h2>

        <form className="space-y-5">
          {/* ETIQUETA */}
          <div>
            <label
              htmlFor="tag"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Etiqueta:
            </label>

            <select
              id="tag"
              name="tag"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione una etiqueta
              </option>

              <option value="001">001</option>
              <option value="002">002</option>
              <option value="003">003</option>
            </select>
          </div>

          {/* RAZA */}
          <div>
            <label
              htmlFor="breed"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Raza:
            </label>

            <select
              id="breed"
              name="breed"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione una raza
              </option>

              <option value="Dorper">Pelibuey</option>
              <option value="Santa Inés">Santa Inés</option>
              <option value="Katahdin">Katahdin</option>
            </select>
          </div>

          {/* SEXO */}
          <div>
            <label
              htmlFor="sex"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Sexo:
            </label>

            <select
              id="sex"
              name="sex"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione un sexo
              </option>

              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          {/* FECHA DE NACIMIENTO */}
          <div>
            <label
              htmlFor="birth_date"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Fecha de Nacimiento:
            </label>

            <input
              type="date"
              id="birth_date"
              name="birth_date"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* PESO */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Peso:
            </label>

            <select
              id="weight"
              name="weight"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione un peso
              </option>

              <option value="10">10 kg</option>
              <option value="20">20 kg</option>
              <option value="30">30 kg</option>
              <option value="40">40 kg</option>
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
            Crear Ovino
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCreationOvine;
