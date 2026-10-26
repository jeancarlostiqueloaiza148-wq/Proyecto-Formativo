"use client"

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { X, Shield, ChevronRight, Sparkles, ArrowRight, CheckCircle2, Zap, Layers, Users, Heart, Wheat, Baby, BarChart3 } from "lucide-react";

export default function App() {
  const [showModal, setShowModal] = useState(false);

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
                  Plataforma Inteligente de Gestión Ovina
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
                  <button 
                    onClick={() => setShowModal(true)}
                    className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Conocer Más</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                <div className="text-5xl mb-4">📋</div>
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
                <h3 className="text-5xl font-black text-orange-500">+10</h3>
                <p className="text-gray-500 mt-2">Módulos</p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-orange-100">
                <h3 className="text-5xl font-black text-orange-500">🧠</h3>
                <p className="text-gray-500 mt-2">Gestión Inteligente</p>
              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />

      {/* Modal de información - Estilo Apple Premium */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl p-4" 
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-300 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header elegante */}
            <div className="px-10 pt-10 pb-6 flex items-center justify-between border-b border-gray-100/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">OVIADSO</h3>
                  <p className="text-sm text-gray-500 font-medium tracking-wide">Sistema de Gestión Ovina</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-gray-600 flex items-center justify-center hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido con tipografía refinada */}
            <div className="px-10 py-8 space-y-10">
              
              {/* Introducción con cita */}
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-5xl text-orange-200 font-serif leading-none">"</div>
                <p className="pl-6 text-lg text-gray-700 leading-relaxed font-light italic">
                  Una plataforma integral diseñada para la gestión eficiente de la producción ovina, 
                  brindando control total sobre cada aspecto de la unidad productiva.
                </p>
              </div>

              {/* Módulos - Grid 2 columnas elegante */}
              <div>
                <h4 className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-orange-200"></span>
                  Módulos del Sistema
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { icon: Users, label: "Gestión de Usuarios", desc: "Control de accesos, roles y permisos" },
                    { icon: Layers, label: "Registro de Ovinos", desc: "Historial completo y genealogía" },
                    { icon: Heart, label: "Sanidad y Mortalidad", desc: "Vacunaciones y control sanitario" },
                    { icon: Wheat, label: "Alimentación y Peso", desc: "Monitoreo nutricional y evolución" },
                    { icon: Baby, label: "Montas y Partos", desc: "Seguimiento reproductivo completo" },
                    { icon: BarChart3, label: "Reportes y Estadísticas", desc: "Análisis de datos productivos" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all duration-300 border border-transparent hover:border-orange-100/50"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{item.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficios - 3 columnas con íconos */}
              <div>
                <h4 className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-orange-200"></span>
                  Beneficios Clave
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: Zap, label: "Eficiencia", desc: "Optimización de procesos y recursos" },
                    { icon: CheckCircle2, label: "Seguridad", desc: "Datos protegidos y respaldados" },
                    { icon: Sparkles, label: "Decisiones", desc: "Basadas en datos confiables" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100/50 hover:border-orange-200/50 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-orange-50 mx-auto flex items-center justify-center mb-3">
                        <item.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <h5 className="font-semibold text-gray-800 text-sm">{item.label}</h5>
                      <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Misión, Visión, Valores */}
              <div>
                <h4 className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-orange-200"></span>
                  Identidad
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "Misión", desc: "Optimizar la gestión ovina mediante tecnología accesible e innovadora" },
                    { label: "Visión", desc: "Ser el referente en gestión ovina digital en Latinoamérica" },
                    { label: "Valores", desc: "Innovación, calidad, compromiso y sostenibilidad" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="p-5 rounded-2xl bg-gray-50/50 hover:bg-orange-50/30 transition-colors border border-gray-100/50 hover:border-orange-100/50"
                    >
                      <h5 className="font-semibold text-orange-500 text-xs uppercase tracking-wider mb-2">{item.label}</h5>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action - Botón naranja elegante estilo Apple */}
              <div className="pt-4 border-t border-gray-100/50 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold tracking-wide hover:shadow-lg hover:shadow-orange-200/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  <span>Comenzar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}