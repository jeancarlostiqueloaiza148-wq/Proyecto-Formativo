import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function Nosotros() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">

        {/* Encabezado */}
        <section className="text-center py-20 px-6">
          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium">
            Equipo OVIADSO
          </span>

          <h1 className="mt-6 text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Nosotros
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg">
            Conoce el equipo encargado del desarrollo de OVIADSO, una plataforma
            creada para optimizar la gestión de la unidad ovina del Centro
            Agropecuario La Granja.
          </p>
        </section>

        {/* Equipo */}
        <section className="max-w-7xl mx-auto px-6">

          <div className="flex justify-center gap-8 flex-wrap mb-20">

            <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center w-64">
              <img
                src="/natalia.jpeg"
                alt="Natalia Reyes"
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-orange-200 mb-4"
              />
              <h3 className="font-bold text-xl text-gray-800">
                Natalia Reyes
              </h3>
              <p className="text-orange-500 font-medium">
                Desarrolladora de Software
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Apasionada por el código limpio y las buenas prácticas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center w-64">
              <img
                src="/jeancarlos.jpeg"
                alt="Jean Carlos Tique"
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-orange-200 mb-4"
              />
              <h3 className="font-bold text-xl text-gray-800">
                Jean Carlos Tique
              </h3>
              <p className="text-orange-500 font-medium">
                Desarrollador de Software
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Enfocado en desarrollo web y soluciones tecnológicas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center w-64">
              <img
                src="/tania.jpeg"
                alt="Tania Ducuara"
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-orange-200 mb-4"
              />
              <h3 className="font-bold text-xl text-gray-800">
                Tania Ducuara
              </h3>
              <p className="text-orange-500 font-medium">
                Ingeniera de Sistemas
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Especialista en desarrollo y diseño de aplicaciones web.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center w-64">
              <img
                src="/danilo.jpeg"
                alt="Danilo Cardoso"
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-orange-200 mb-4"
              />
              <h3 className="font-bold text-xl text-gray-800">
                Danilo Cardoso
              </h3>
              <p className="text-orange-500 font-medium">
                Desarrollador de Software
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Comprometido con la innovación y el desarrollo tecnológico.
              </p>
            </div>

          </div>

          {/* Descripción */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-lg text-gray-600 leading-8">
              Este proyecto es una aplicación web desarrollada como parte del
              proceso formativo del SENA, donde aplicamos nuestros conocimientos
              y habilidades para construir una solución tecnológica enfocada en
              mejorar la gestión de la unidad ovina y facilitar la toma de
              decisiones mediante información organizada y confiable.
            </p>
          </div>

          {/* Instructores */}
          <section className="mb-24">

            <h2 className="text-4xl font-bold text-center text-orange-600 mb-12">
              Instructores Técnicos
            </h2>

            <div className="flex justify-center gap-12 flex-wrap">

              <div className="bg-white p-6 rounded-3xl shadow-lg text-center w-72 hover:shadow-2xl transition">
                <div className="w-32 h-32 bg-orange-100 rounded-full mx-auto mb-4"></div>
                <p className="font-bold text-lg">
                  Myriam Yaneth Gonzales Reyes
                </p>
                <p className="text-gray-500">
                  Ingeniera de Software
                </p>
                <p className="text-sm text-gray-400">
                  Especialista en Bases de Datos
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg text-center w-72 hover:shadow-2xl transition">
                <div className="w-32 h-32 bg-orange-100 rounded-full mx-auto mb-4"></div>
                <p className="font-bold text-lg">
                  Euclidez Norbey Basto Ortiz
                </p>
                <p className="text-gray-500">
                  Ingeniero de Sistemas
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg text-center w-72 hover:shadow-2xl transition">
                <div className="w-32 h-32 bg-orange-100 rounded-full mx-auto mb-4"></div>
                <p className="font-bold text-lg">
                  Gladys María Cardeño Ardila
                </p>
                <p className="text-gray-500">
                  Médica Veterinaria Zootecnista
                </p>
                <p className="text-sm text-gray-400">
                  Especialista en Pedagogía
                </p>
              </div>

            </div>

          </section>

          {/* Unidad */}
          <section className="max-w-5xl mx-auto text-center mb-20">

            <h2 className="text-4xl font-bold text-orange-600 mb-6">
              Unidad Ovina
            </h2>

            <p className="text-gray-700 mb-10 leading-8">
              La unidad de ovinos del Centro Agropecuario La Granja del SENA
              Espinal es un espacio destinado al manejo y producción ovina.
              Actualmente la información se gestiona de forma manual, lo que
              dificulta su organización. Por ello se desarrolla OVIADSO para
              optimizar la administración de los procesos productivos y
              sanitarios de la unidad.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

              <img src="/ovino1.jpeg" alt="" className="rounded-2xl shadow-lg hover:scale-105 transition h-40 w-full object-cover" />
              <img src="/ovi1.jpeg" alt="" className="rounded-2xl shadow-lg hover:scale-105 transition h-40 w-full object-cover" />
              <img src="/uni2.jpeg" alt="" className="rounded-2xl shadow-lg hover:scale-105 transition h-40 w-full object-cover" />
              <img src="/ovi3.jpeg" alt="" className="rounded-2xl shadow-lg hover:scale-105 transition h-40 w-full object-cover" />
              <img src="/ovi4.jpeg" alt="" className="rounded-2xl shadow-lg hover:scale-105 transition h-40 w-full object-cover" />
              <img src="/ovinos1.jpeg" alt="" className="rounded-2xl shadow-lg hover:scale-105 transition h-40 w-full object-cover" />

            </div>

          </section>

          {/* Banner */}
          <section className="max-w-4xl mx-auto text-center py-10 mb-16">

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-10 rounded-3xl shadow-xl">

              <h2 className="text-3xl font-bold mb-4">
                OVIADSO
              </h2>

              <p className="text-lg">
                Transformando la gestión ovina mediante tecnología,
                organización y análisis de información para una mejor
                toma de decisiones.
              </p>

            </div>

          </section>

        </section>

      </main>

      <Footer />
    </>
  );
}