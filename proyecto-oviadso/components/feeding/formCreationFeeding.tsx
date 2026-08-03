function FormCreationFeeding() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500">
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
          Crear Alimentación
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

          {/* ID OVINO */}
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

              <option value="101">Ovino 1</option>
              <option value="102">Ovino 2</option>
              <option value="103">Ovino 3</option>
            </select>
          </div>

          {/* TIPO DE ALIMENTO */}
          <div>
            <label
              htmlFor="food_type"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Tipo de Alimento:
            </label>

            <input
              type="text"
              id="food_type"
              name="food_type"
              className="w-full rounded-lg border border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* CANTIDAD */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Cantidad:
            </label>

            <select
              id="quantity"
              name="quantity"
              defaultValue=""
              className="w-full rounded-lg border border-orange-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Seleccione una cantidad
              </option>

              <option value="1">1 kg</option>
              <option value="2">2 kg</option>
              <option value="3">3 kg</option>
              <option value="4">4 kg</option>
              <option value="5">5 kg</option>
              <option value="6">6 kg</option>
              <option value="7">7 kg</option>
              <option value="8">8 kg</option>
              <option value="9">9 kg</option>
              <option value="10">10 kg</option>
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
            Crear Alimentación
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCreationFeeding;