"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import FormProfile from "@/app/profile/formProfile";
import FormPassword from "@/app/profile/formPassword";

import {
  User,
  UserCog,
  LogOut,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

interface UserData {
  username?: string;
  nombre?: string;
  name?: string;
  email?: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    const validateSession = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        localStorage.removeItem("user");
        router.replace("/");
        return;
      }

      try {
        const parts = token.split(".");

        if (parts.length !== 3) {
          throw new Error("Formato de token inválido");
        }

        const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");

        const payloadDecoded = atob(
          payloadBase64.padEnd(
            payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
            "=",
          ),
        );

        const payload = JSON.parse(payloadDecoded);

        if (
          typeof payload.exp !== "number" ||
          payload.exp * 1000 <= Date.now()
        ) {
          throw new Error("El token ha expirado");
        }

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        setIsCheckingAuth(false);
      } catch (error) {
        console.error("Sesión no válida:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.replace("/");
      }
    };

    validateSession();
  }, [router]);

  const handleLogout = () => {
    setOpenLogout(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/");
  };

  const userName = user?.nombre || user?.name || user?.username || "Usuario";
  const userEmail = user?.email || "";

  if (isCheckingAuth) {
    return null;
  }

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <AppSidebar />

      <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-gray-50">
        {/* Barra superior */}
        <header className="relative z-50 flex h-20 shrink-0 items-center gap-3 bg-gray-300 px-6">
          <SidebarTrigger />

          <div className="ml-auto flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir menú de cuenta"
                  className="mt-5 flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56"
                align="end"
                side="bottom"
                sideOffset={8}
              >
                <DropdownMenuLabel>
                  <p>Mi cuenta</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={() => setOpenProfile(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Actualizar Perfil</span>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={() => setOpenPassword(true)}>
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Cambiar Contraseña</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onSelect={() => setOpenLogout(true)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {userName}
              </p>
              <p className="text-xs text-gray-600">{userEmail}</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>

        {/* Área desplazable */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>

        {/* Diálogo para actualizar perfil */}
        <Dialog open={openProfile} onOpenChange={setOpenProfile}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader />
            <FormProfile />
          </DialogContent>
        </Dialog>

        {/* Diálogo para cambiar contraseña */}
        <Dialog open={openPassword} onOpenChange={setOpenPassword}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Cambiar contraseña</DialogTitle>
              <DialogDescription>
                Actualiza la contraseña de tu cuenta en OVIADSO.
              </DialogDescription>
            </DialogHeader>

            <FormPassword />
          </DialogContent>
        </Dialog>

        {/* Modal de confirmación de cierre de sesión */}
        <Dialog open={openLogout} onOpenChange={setOpenLogout}>
          <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
            <div className="flex flex-col items-center px-6 pb-5 pt-7 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-7 w-7 text-red-600" />
              </div>

              <DialogHeader className="items-center space-y-2">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  ¿Seguro que deseas cerrar sesión?
                </DialogTitle>

                <DialogDescription className="max-w-xs text-center leading-6">
                  Estás a punto de salir de tu cuenta de OVIADSO. Tendrás que
                  iniciar sesión nuevamente para acceder.
                </DialogDescription>
              </DialogHeader>
            </div>

            <DialogFooter className="flex-col-reverse gap-2 border-t bg-muted/40 px-6 py-4 sm:flex-row sm:justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenLogout(false)}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={handleLogout}
                className="w-full gap-2 sm:w-auto"
              >
                <LogOut className="h-4 w-4" />
                Sí, cerrar sesión
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </SidebarProvider>
  );
}
