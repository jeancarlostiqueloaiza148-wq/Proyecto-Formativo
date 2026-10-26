"use client"

import Image from "next/image"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
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
  Sprout,
  HeartPulse,
  PawPrint,
  HeartHandshake,
  CalendarHeart,
  User,
  Scale,
  ContactRound,
  
} from "lucide-react"

const navGroups = [
  {
    title: "Gestión de Ovinos",
    items: [
      { title: "Ovinos", icon: Shield, url: "/dashboard/ovine" },
      { title: "Peso", icon: Scale, url: "/dashboard/weight" },
      { title: "Nacimientos", icon: PawPrint, url: "/dashboard/birth" },
      { title: "Mortalidad", icon: Skull, url: "/dashboard/mortality" },
    ],
  },
  {
    title: "Gestión de Alimentación",
    items: [
      { title: "Alimentación", icon: Sprout, url: "/dashboard/feeding" },
    ],
  },
  {
    title: "Sanidad",
    items: [
      { title: "Sanidad", icon: HeartPulse, url: "/dashboard/health" },
    ],
  },
  {
    title: "Reproducción",
    items: [
      { title: "Montas", icon: HeartHandshake, url: "/dashboard/mounting" },
      { title: "Partos", icon: CalendarHeart, url: "/dashboard/delivery" },
    ],
  },
  {
    title: "Administración",
    items: [
      { title: "Usuarios", icon: User, url: "/dashboard/user" },
      { title: "Responsables", icon: ContactRound, url: "/dashboard/responsibles" },
    ],
  },
]

type NavItemType = (typeof navGroups)[0]["items"][0]

function NavItem({ item }: { item: NavItemType }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        // Al colapsar, le damos un padding cero y forzamos que el contenido se centre
        className="group relative my-0.5 w-full rounded-xl px-3 py-2.5 transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-black group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
      >
        <Link 
          href={item.url} 
          className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
        >
          <item.icon className="h-5 w-5 shrink-0 text-orange-500" />
          {/* El texto se oculta al colapsar */}
          <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-black group-data-[collapsible=icon]:hidden">
            {item.title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-white border-r shadow-lg"
    >
      {/* 
        Cambios clave en el Header:
        1. Se agregó 'group-data-[collapsible=icon]:!p-0' para quitar el padding interno que lo empuja a la izquierda.
        2. Se agregó 'group-data-[collapsible=icon]:justify-center' para centrar la imagen.
      */}
      <SidebarHeader className="bg-gradient-to-r from-gray-300 to-gray-300 text-orange-500 h-20 flex items-center justify-center px-4 overflow-hidden group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center">
        <div className="flex flex-row items-center justify-center gap-3 w-full">
          
          {/* La imagen siempre se muestra */}
          <Image
            src="/logo.png"
            alt="Logo OVIADSO"
            width={50}
            height={40}
            className="object-contain shrink-0"
          />

          {/* Solo el texto se oculta al colapsar */}
          <h2 className="text-2xl font-extrabold text-black tracking-wide whitespace-nowrap group-data-[collapsible=icon]:hidden">
            OVIADSO
          </h2>
        </div>
      </SidebarHeader>

      {/* Al colapsar, quitamos el padding horizontal (px-0) */}
      <SidebarContent className="px-3 py-5 group-data-[collapsible=icon]:px-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-5">
              
              {navGroups.map((group) => (
                <div key={group.title}>
                  {/* Los títulos de los grupos se ocultan */}
                  <div className="px-3 pb-1.5 text-[10px] font-semibold text-gray-400/80 tracking-[0.2em] uppercase group-data-[collapsible=icon]:hidden">
                    {group.title}
                  </div>
                  {group.items.map((item) => (
                    <NavItem key={item.title} item={item} />
                  ))}
                </div>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}