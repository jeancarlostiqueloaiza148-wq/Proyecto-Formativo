function FormCreationOvine() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500">

        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Crear Ovino
        </h2>


        <form className="space-y-5">


          <div>
            <label
              htmlFor="tag"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Etiqueta:
            </label>

            <input
              type="text"
              id="tag"
              name="tag"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>


          <div>
            <label
              htmlFor="breed"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Raza:
            </label>

            <input
              type="text"
              id="breed"
              name="breed"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>


          <div>
            <label
              htmlFor="sex"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Sexo:
            </label>

            <input
              type="text"
              id="sex"
              name="sex"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>


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
            Crear Ovino
          </button>


        </form>

      </div>

    </div>
  );
}

export default FormCreationOvine;