import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export default function Layout({
 children
}: {
 children: React.ReactNode
}) {


return (

<SidebarProvider>


<AppSidebar />


<main className="
w-full
min-h-screen
bg-gray-50
">


<div className="
p-5
flex
items-center
gap-3
">

<SidebarTrigger />


<h1 className="
text-2xl
font-bold
text-orange-500
">
OVIADSO
</h1>


</div>


{children}


</main>


</SidebarProvider>

)

}