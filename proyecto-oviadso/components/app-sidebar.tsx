"use client"

import { useState } from "react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Shield,
  Skull,
  Wheat,
  HeartPulse,
  PawPrint,
  HeartHandshake,
  CalendarHeart,
  User,
  ChevronDown,
  ChevronRight,
  Scale,
  LogOut,
} from "lucide-react"

const items = [
  {
    title: "Usuarios",
    icon: User,
    children: [
      { title: "Listar Usuarios", url: "/Dashboard/user" },
      { title: "Crear Usuario", url: "/Dashboard/user/form" },
    ],
  },
  {
    title: "Nacimientos",
    icon: PawPrint,
    children: [
      { title: "Listar Nacimientos", url: "/Dashboard/birth" },
      { title: "Crear Nacimiento", url: "/Dashboard/birth/form" },
    ],
  },
  {
    title: "Mortalidad",
    icon: Skull,
    children: [
      { title: "Listar Mortalidades", url: "/Dashboard/mortality" },
      { title: "Crear Mortalidad", url: "/Dashboard/mortality/form" },
    ],
  },
  {
    title: "Alimentación",
    icon: Wheat,
    children: [
      { title: "Listar Alimentaciones", url: "/Dashboard/feeding" },
      { title: "Crear Alimentación", url: "/Dashboard/feeding/form" },
    ],
  },
  {
    title: "Sanidad",
    icon: HeartPulse,
    children: [
      { title: "Listar Sanidades", url: "/Dashboard/health" },
      { title: "Crear Sanidad", url: "/Dashboard/health/form" },
    ],
  },
  {
    title: "Ovinos",
    icon: Shield,
    children: [
      { title: "Listar Ovinos", url: "/Dashboard/ovine" },
      { title: "Crear Ovino", url: "/Dashboard/ovine/form" },
    ],
  },
  {
    title: "Montas",
    icon: HeartHandshake,
    children: [
      { title: "Listar Montas", url: "/Dashboard/mounting" },
      { title: "Crear Monta", url: "/Dashboard/mounting/form" },
    ],
  },
  {
    title: "Partos",
    icon: CalendarHeart,
    children: [
      { title: "Listar Partos", url: "/Dashboard/delivery" },
      { title: "Crear Parto", url: "/Dashboard/delivery/form" },
    ],
  },
  {
    title: "Peso",
    icon: Scale,
    children: [
      { title: "Listar Pesos", url: "/Dashboard/weight" },
      { title: "Crear Peso", url: "/Dashboard/weight/form" },
    ],
  },
  {
    title: "Responsables",
    icon: User,
    children: [
      { title: "Listar Responsables", url: "/Dashboard/responsibles" },
      { title: "Crear Responsable", url: "/Dashboard/responsibles/form" },
    ],
  },
]

export function AppSidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <Sidebar className="bg-white border-r shadow-lg">

      <SidebarHeader className="bg-orange-500 text-white py-5">
        <h2 className="text-center text-1xl font-bold tracking-wider">
          Gestion De Ovinos
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton
                    onClick={() =>
                      setOpenMenu(
                        openMenu === item.title ? null : item.title
                      )
                    }
                    className={`my-1 rounded-lg transition-all duration-200 hover:bg-orange-100 hover:text-orange-600 ${
                      openMenu === item.title
                        ? "bg-orange-100 text-orange-600"
                        : ""
                    }`}
                  >
                    <item.icon className="h-5 w-5" />

                    <span className="flex-1 font-medium">
                      {item.title}
                    </span>

                    {openMenu === item.title ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}

                  </SidebarMenuButton>

                  {openMenu === item.title && (

                    <div className="ml-10 mt-2 flex flex-col gap-1">

                      {item.children.map((child) => (

                        <Link
                          key={child.title}
                          href={child.url}
                          className="rounded-md px-2 py-1 text-sm text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                          {child.title}
                        </Link>

                      ))}

                    </div>

                  )}

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    <SidebarFooter className="border-t bg-white p-0">
  <div className="flex items-center justify-between border border-orange-100 bg-white px-2 py-3 shadow-sm">

    {/* Información del usuario */}
    <div className="flex items-center gap-2">

      {/* Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white shadow">
        J
      </div>

      {/* Datos */}
      <div>
        <p className="text-base font-bold leading-5 text-gray-800">
          Jean Carlos
        </p>

        <p className="text-xs text-orange-500">
          jeancarlos@oviadso.com
        </p>
      </div>

    </div>

    {/* Botón salir */}
    <button
      onClick={() => {
        console.log("Cerrar sesión")
      }}
      className="rounded-full p-2 text-orange-500 transition-all duration-300 hover:bg-orange-100 hover:text-orange-600"
    >
      <LogOut size={18} />
    </button>

  </div>
</SidebarFooter>

    </Sidebar>
  )
}