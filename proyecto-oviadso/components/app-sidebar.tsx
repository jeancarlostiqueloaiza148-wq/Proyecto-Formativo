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
  LayoutDashboard,
  Baby,
  Skull,
  Wheat,
  HeartPulse,
  PawPrint,
  HeartHandshake,
  CalendarHeart,
  User,
  ChevronDown,
  ChevronRight,
  
} from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "/Dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Usuario",
    icon: User,
    children: [
      { title: "Tabla Usuario", url: "/Dashboard/user" },
      { title: "Formulario Usuario", url: "/Dashboard/user/form" },
    ],
  },

  {
    title: "Nacimientos",
    icon: Baby,
    children: [
      { title: "Tabla Nacimientos", url: "/Dashboard/birth" },
      { title: "Formulario Nacimientos", url: "/Dashboard/birth/form" },
    ],
  },

  {
    title: "Mortalidad",
    icon: Skull,
    children: [
      { title: "Tabla Mortalidad", url: "/Dashboard/mortality" },
      { title: "Formulario Mortalidad", url: "/Dashboard/mortality/form" },
    ],
  },

  {
    title: "Alimentación",
    icon: Wheat,
    children: [
      { title: "Tabla Alimentación", url: "/Dashboard/feeding" },
      { title: "Formulario Alimentación", url: "/Dashboard/feeding/form" },
    ],
  },

  {
    title: "Sanidad",
    icon: HeartPulse,
    children: [
      { title: "Tabla Sanidad", url: "/Dashboard/health" },
      { title: "Formulario Sanidad", url: "/Dashboard/health/form" },
    ],
  },

  {
    title: "Ovino",
    icon: PawPrint,
    children: [
      { title: "Tabla Ovino", url: "/Dashboard/ovine" },
      { title: "Formulario Ovino", url: "/Dashboard/ovine/form" },
    ],
  },

  {
    title: "Montas",
    icon: HeartHandshake,
    children: [
      { title: "Tabla Montas", url: "/Dashboard/mounting" },
      { title: "Formulario Montas", url: "/Dashboard/mounting/form" },
    ],
  },

  {
    title: "Partos",
    icon: CalendarHeart,
    children: [
      { title: "Tabla Partos", url: "/Dashboard/delivery" },
      { title: "Formulario Partos", url: "/Dashboard/delivery/form" },
    ],
  },

  {
    title: "Responsables",
    icon: User,
    children: [
      { title: "Tabla Responsables", url: "/Dashboard/responsibles" },
      { title: "Formulario Responsables", url: "/Dashboard/responsibles/form" },
    ],
  },
]

export function AppSidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="px-4 py-2 font-bold">OVIADSO</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>

                  {item.children ? (
                    <>
                      <SidebarMenuButton
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item.title ? null : item.title
                          )
                        }
                      >
                        <item.icon />

                        <span className="flex-1">
                          {item.title}
                        </span>

                        {openMenu === item.title ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </SidebarMenuButton>

                      {openMenu === item.title && (
                        <div className="ml-8 mt-2 flex flex-col gap-2">

                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.url}
                              className="text-sm hover:underline"
                            >
                              {child.title}
                            </Link>
                          ))}

                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}

                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/responsable">
                <User />
                <span>Responsable</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}