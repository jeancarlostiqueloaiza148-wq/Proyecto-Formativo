"use client";

import React from "react";
import Link from "next/link";
import Login from "../auth/Login";

export default function NavBar() {
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <nav className="w-full border-b border-gray-300 bg-white">


      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4">

        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-20 h-20" />
          <span className="font-semibold text-lg">Oviadso</span>
        </Link>

        <div className="flex-1 mx-10 hidden md:block">
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/contacto">Contacto</Link>
          <Login textButton="Ingresar" />
        </div>

        
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="sm:hidden"
        >
          ☰
        </button>
      </div>

     
      
    
      {openMenu && (
        <div className="flex flex-col px-6 py-4 gap-2 sm:hidden">
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/contacto">Contacto</Link>

          
        </div>
      )}
    </nav>
  );
}