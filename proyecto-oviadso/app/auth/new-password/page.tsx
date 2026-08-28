function PageNewPassword() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4">
      
      <section className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-8 sm:p-10">
          
          {/* Encabezado */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Nueva contraseña
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              formulario de nueva contraseña
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-5">
            
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nueva contraseña
              </label>

              <input
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirmar contraseña
              </label>

              <input
                type="password"
                placeholder="Repite tu nueva contraseña"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl active:translate-y-0"
            >
              Cambiar contraseña
            </button>
          </form>

          {/* Pie */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Tu contraseña debe ser segura y fácil de recordar.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PageNewPassword;