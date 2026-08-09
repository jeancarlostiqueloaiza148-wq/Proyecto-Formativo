import Image from "next/image"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>

      <AppSidebar />

      <main
        className="
        w-full
        min-h-screen
        bg-gray-50
      "
      >

        {/* Encabezado */}
        <div
          className="
          p-4
          flex
          items-center
          gap-2
        "
        >
          <SidebarTrigger />

          <div className="flex items-center gap-3">

            <Image
              src="/logo.png"
              alt="Logo OVIADSO"
              width={60}
              height={48}
              className="object-contain"
            />

            <h1
              className="
              text-2xl
              font-extrabold
              text-orange-500
              tracking-wide
            "
            >
              OVIADSO
            </h1>

          </div>
        </div>

        {children}

      </main>

    </SidebarProvider>
  )
}