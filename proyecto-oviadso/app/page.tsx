import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function App() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100">

        {/* HERO PRINCIPAL */}
        <section className="relative overflow-hidden">

          {/* Fondos decorativos */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-300 rounded-full blur-3xl opacity-20"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-24">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Texto */}
              <div>

                <span className="inline-flex items-center gap-2 px-5 py-2 bg-orange-100 text-orange-600 rounded-full font-semibold mb-6">
                  🐑 Plataforma Inteligente de Gestión Ovina
                </span>

                <h1 className="text-5xl md:text-6xl font-black leading-tight mb-8">
                  <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    Bienvenido a OVIADSO
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-9 mb-6">
                  Administra y controla la producción ovina de forma eficiente
                  desde una sola plataforma moderna, diseñada para optimizar
                  procesos, mejorar la organización y facilitar la toma de
                  decisiones.
                </p>

                <p className="text-lg text-gray-500 leading-8 mb-10">
                  Registra nacimientos, controla la alimentación, monitorea el
                  estado sanitario, realiza seguimiento reproductivo y gestiona
                  el peso de cada animal. Toda la información estará disponible
                  de manera organizada, segura y accesible.
                </p>

                <div className="flex flex-wrap gap-4">

                  <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300">
                    Explorar Plataforma
                  </button>

                  <button className="px-8 py-4 rounded-2xl border-2 border-orange-500 text-orange-500 font-bold hover:bg-orange-50 transition-all duration-300">
                    Conocer Más
                  </button>

                </div>

              </div>

              {/* Imagen Principal */}
              <div className="relative flex justify-center">

                <div className="absolute w-[450px] h-[450px] bg-orange-300 rounded-full blur-3xl opacity-25"></div>

                <img
                  src="/bono.jpeg"
                  alt="Sistema OVIADSO"
                  className="
                    relative
                    w-full
                    max-w-[500px]
                    h-[500px]
                    object-cover
                    rounded-[40px]
                    shadow-2xl
                    border-[10px]
                    border-white
                    hover:scale-105
                    transition-all
                    duration-500
                  "
                />

              </div>

            </div>

            {/* Sección Unidad Ovina */}
            <div className="mt-24">

              <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-orange-100">

                <div className="grid lg:grid-cols-2 items-center">

                  <img
                    src="/unidaddeovinos.jpeg"
                    alt="Unidad de Ovinos"
                    className="w-full h-full object-cover min-h-[450px]"
                  />

                  <div className="p-12">

                    <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
                      Centro Agropecuario La Granja
                    </span>

                    <h2 className="text-4xl font-bold text-orange-600 mt-6 mb-6">
                      Innovación para la Gestión Ovina
                    </h2>

                    <p className="text-gray-600 text-lg leading-8 mb-6">
                      La Unidad de Ovinos del Centro Agropecuario La Granja del
                      SENA Espinal es un espacio dedicado a la producción,
                      manejo y seguimiento técnico de los ovinos.
                    </p>

                    <p className="text-gray-600 text-lg leading-8">
                      OVIADSO surge como una solución tecnológica que permite
                      centralizar la información, optimizar procesos y mejorar
                      la eficiencia administrativa y productiva mediante una
                      gestión digital moderna.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Características */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300">
                <div className="text-5xl mb-4">🐑</div>
                <h3 className="text-2xl font-bold text-orange-600 mb-3">
                  Control Ovino
                </h3>
                <p className="text-gray-600">
                  Registro detallado de cada animal, historial productivo,
                  reproductivo y sanitario.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-orange-600 mb-3">
                  Información Centralizada
                </h3>
                <p className="text-gray-600">
                  Consulta toda la información de la unidad desde una sola
                  plataforma de manera rápida y organizada.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-orange-600 mb-3">
                  Mayor Productividad
                </h3>
                <p className="text-gray-600">
                  Optimiza recursos y mejora la toma de decisiones mediante
                  datos confiables y actualizados.
                </p>
              </div>

            </div>

            {/* Estadísticas */}
            <div className="grid md:grid-cols-4 gap-6 mt-20">

              <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-orange-100">
                <h3 className="text-5xl font-black text-orange-500">100%</h3>
                <p className="text-gray-500 mt-2">Digital</p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-orange-100">
                <h3 className="text-5xl font-black text-orange-500">24/7</h3>
                <p className="text-gray-500 mt-2">Disponibilidad</p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-orange-100">
                <h3 className="text-5xl font-black text-orange-500">+6</h3>
                <p className="text-gray-500 mt-2">Módulos</p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-orange-100">
                <h3 className="text-5xl font-black text-orange-500">🐑</h3>
                <p className="text-gray-500 mt-2">Gestión Inteligente</p>
              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}   