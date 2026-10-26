"use client"

import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Contacto() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <NavBar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
        {/* Fondo con gradiente mejorado */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-100/50"></div>
        
        {/* Círculos decorativos mejorados */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-amber-300 to-orange-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-orange-100 rounded-full blur-3xl opacity-10"></div>

        {/* Líneas decorativas */}
        <div className="absolute top-20 left-10 w-32 h-32 border-t-2 border-l-2 border-orange-200/30 rounded-tl-3xl hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border-b-2 border-r-2 border-orange-200/30 rounded-br-3xl hidden lg:block"></div>

        {/* Contenido */}
        <div className="relative z-10 max-w-6xl w-full px-4 sm:px-6 py-10 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* IZQUIERDA - Información de contacto */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 rounded-full font-semibold text-xs md:text-sm border border-orange-200 shadow-sm">
                <span className="text-base md:text-lg">📬</span>
                Contáctanos
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-4 md:mt-5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                Hablemos
              </h2>
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-3 md:mt-4"></div>
              <p className="text-gray-600 mt-4 md:mt-6 leading-relaxed text-base md:text-lg">
                ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.
                Completa el formulario o contáctanos directamente.
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {/* Dirección */}
              <div className="group flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-orange-100/50 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-base md:text-lg">Dirección</p>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                    53C9+PV, Chicoral - Espinal #Km 2, Chicoral, Macegal, El Espinal, Tolima
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="group flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-orange-100/50 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-base md:text-lg">Teléfono</p>
                  <p className="text-gray-500 text-xs md:text-sm">+57 310 8815457</p>
                  <p className="text-gray-500 text-xs md:text-sm">+57 314 3154222</p>
                </div>
              </div>

              {/* Correo */}
              <div className="group flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-orange-100/50 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-base md:text-lg">Correo Electrónico</p>
                  <p className="text-gray-500 text-xs md:text-sm">ventasoviadso@gmail.com</p>
                  <p className="text-gray-500 text-xs md:text-sm">soporteoviadso2026@gmail.com</p>
                </div>
              </div>
            </div>

            {/* BADGES DE CONFIANZA ELIMINADOS */}
          </div>

          {/* DERECHA - Formulario */}
          <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl border border-orange-100/50 hover:shadow-orange-100/30 transition-all duration-500 hover:-translate-y-2">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 mb-3 md:mb-4 shadow-md">
                <Send className="w-6 h-6 md:w-7 md:h-7 text-orange-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Envíanos un mensaje</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1 md:mt-2">Completa el formulario y te responderemos pronto</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Nombre completo
                </label>
                <input 
                  type="text" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre" 
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-50/80 text-gray-800 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 placeholder:text-gray-400 text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Correo electrónico
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com" 
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-50/80 text-gray-800 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 placeholder:text-gray-400 text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Mensaje
                </label>
                <textarea 
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="¿En qué podemos ayudarte?" 
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-50/80 text-gray-800 rounded-xl h-28 md:h-36 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 placeholder:text-gray-400 resize-none text-sm md:text-base"
                  required
                />
              </div>

              <button 
                type="submit"
                className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 animate-in zoom-in duration-300" />
                    <span>¡Mensaje enviado!</span>
                  </>
                ) : (
                  <>
                    <span>Enviar mensaje</span>
                    <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {isSubmitted && (
                <div className="text-center p-3 md:p-4 bg-green-50 rounded-xl border border-green-200 animate-in slide-in-from-top-4 duration-300">
                  <p className="text-xs md:text-sm text-green-700 font-medium">
                    ✅ ¡Gracias! Tu mensaje ha sido enviado exitosamente.
                  </p>
                </div>
              )}
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}