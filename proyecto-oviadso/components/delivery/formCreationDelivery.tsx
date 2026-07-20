function FormCreationDelivery() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500">


        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Crear Parto
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
              htmlFor="mother_id"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              ID Madre:
            </label>

            <input
              type="number"
              id="mother_id"
              name="mother_id"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>



          <div>
            <label
              htmlFor="number_of_offspring"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Número de Crías:
            </label>

            <input
              type="number"
              id="number_of_offspring"
              name="number_of_offspring"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>



          <div>
            <label
              htmlFor="type_of_birth"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Tipo de Parto:
            </label>

            <input
              type="text"
              id="type_of_birth"
              name="type_of_birth"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>



          <div>
            <label
              htmlFor="complications"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Complicaciones:
            </label>

            <input
              type="text"
              id="complications"
              name="complications"
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
            Crear Parto
          </button>


        </form>

      </div>

    </div>
  );
}

export default FormCreationDelivery;