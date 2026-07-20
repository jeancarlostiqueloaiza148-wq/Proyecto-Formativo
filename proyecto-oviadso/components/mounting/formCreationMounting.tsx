function FormCreationMounting() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500">


        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Crear Monta
        </h2>


        <form className="space-y-5">


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



          <div>
            <label
              htmlFor="male_id"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              ID Macho:
            </label>

            <input
              type="number"
              id="male_id"
              name="male_id"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>



          <div>
            <label
              htmlFor="female_id"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              ID Hembra:
            </label>

            <input
              type="number"
              id="female_id"
              name="female_id"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>



          <div>
            <label
              htmlFor="result"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Resultado:
            </label>

            <input
              type="text"
              id="result"
              name="result"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>



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



          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition duration-300 shadow-md"
          >
            Crear Monta
          </button>


        </form>

      </div>

    </div>
  );
}

export default FormCreationMounting;