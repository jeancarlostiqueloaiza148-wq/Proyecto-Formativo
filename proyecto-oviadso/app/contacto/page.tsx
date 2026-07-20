import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

export default function Contacto() {
  return (
    <>
      <NavBar />

      <section className="relative min-h-screen flex items-center justify-center text-white">
        {/* Fondo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fff7ed] via-[#fed7aa] to-[#f97316]"></div>

        {/* Contenido */}
        <div className="relative z-10 max-w-6xl w-full px-6 grid md:grid-cols-2 gap-12">
          {/* IZQUIERDA */}
                    <div>
                        <h2 className="text-4xl font-bold mb-2 text-orange-600">
                            Contáctanos
                        </h2>

                        {/* línea decorativa */}
                        <div className="w-20 h-1 bg-orange-500 mb-6"></div>

                        <p className="text-gray-600 mb-6">
                            ¿Tienes algo que decir? Estamos aquí para ayudarte.
                            Llena el formulario, envía un correo electrónico o llama al teléfono.
                        </p>

                        <div className="space-y-6">

                            <div className="flex items-start space-x-4">
                                <span className="text-xl text-orange-500">📍</span>
                                <div>
                                    <p className="font-semibold">Dirección:</p>
                                    <p className="text-gray-600">
                                        53C9+PV, Chicoral - Espinal #Km 2, Chicoral, Macegal, El Espinal, Tolima
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <span className="text-xl text-orange-500">📞</span>
                                <div>
                                    <p className="font-semibold">Teléfono:</p>
                                    <p className="text-gray-600">+57310 8815457</p>
                                    <p className="text-gray-600">+573143154222</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <span className="text-xl text-orange-500">✉️</span>
                                <div>
                                    <p className="font-semibold">Correo:</p>
                                    <p className="text-gray-600">ventasoviadso@gmail.com</p>
                                    <p className="text-gray-600">soporteoviadso2026@gmail.com</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">

                        <form>
                            <input 
                                type="text" 
                                placeholder="Nombre" 
                                className="w-full mb-4 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />

                            <input 
                                type="email" 
                                placeholder="Correo" 
                                className="w-full mb-4 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />

                            <textarea 
                                placeholder="Mensaje" 
                                className="w-full mb-4 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg h-24 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />

                            <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold">
                                ENVIAR
                            </button>
                        </form>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    )
}