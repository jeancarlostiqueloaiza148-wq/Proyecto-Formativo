"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import ResetPassword from "./page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";

export default function Login(props: any) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // datos del login
  const [eye, setEye] = useState(<EyeClosed />);
  const [typePassword, setTypePassword] = useState("password");

  const router = useRouter();

  const handleResetClick = () => {
    setIsLoginOpen(false);
    setIsResetOpen(true);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.log("Respuesta del login:", data);

      if (!response.ok || data.success === false) {
        setError(
          data.error ||
            data.message ||
            data.mensaje ||
            "Usuario o contraseña incorrectos",
        );
        return;
      }

      // Obtener token y usuario de la respuesta del backend
      const token = data.info?.token;
      const user = data.info?.user;

      // Validar que el backend haya enviado el token
      if (!token) {
        setError("El backend no está enviando el token");
        return;
      }

      // Guardar token
      localStorage.setItem("token", token);

      // Guardar usuario
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Cerrar ventana de login
      setIsLoginOpen(false);

      // Entrar al Dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const MostrarPassword = () => {
    if (typePassword == "password") {
      setTypePassword("text");
      setEye(<Eye />);
    } else {
      setTypePassword("password");
      setEye(<EyeClosed />);
    }
  };

  return (
    <>
      {/* LOGIN DIALOG */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger
          type="button"
          className="
            rounded-3xl
            bg-gradient-to-r
            from-orange-500
            via-amber-500
            to-yellow-400
            px-4
            py-1.5
            text-sm
            font-semibold
            text-white
            shadow-md
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-lg
          "
        >
          {props.textButton}
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm overflow-hidden rounded-[24px] border-0 bg-white p-0 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          {/* HEADER */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-300 via-gray-300 to-gray-300 px-6 py-3">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

            <DialogHeader className="relative z-10 text-center">
              <DialogTitle className="text-2xl font-bold tracking-tight text-black/90">
                Bienvenido
              </DialogTitle>

              <DialogDescription className="mt-1.5 text-sm text-black/70">
                Inicia sesión para acceder a tu cuenta
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* CONTENIDO */}
          <div className="px-6 py-4">
            <form onSubmit={handleLogin}>
              <FieldGroup className="space-y-1.5">
                {/* EMAIL */}
                <Field>
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Correo electrónico
                  </Label>

                  <div className="relative">
                    <div className="absolute left-0 top-0 h-10 w-10 flex items-center justify-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingrese su correo electrónico"
                      className="mt-0 h-10 w-full rounded-xl border-gray-200 bg-gray-50 pl-9 pr-3.5 text-sm shadow-sm transition-all duration-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-200"
                      required
                    />
                  </div>
                </Field>

                {/* CONTRASEÑA */}
                <Field className="-mt-0.5">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Contraseña
                  </Label>

                  <div className="relative">
                    {/* ICONO CONTRASEÑA */}
                    <div className="absolute left-0 top-0 h-10 w-10 flex items-center justify-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>

                    <Input
                      id="password"
                      name="Contraseña"
                      type={typePassword}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingrese su contraseña"
                      className="mt-0 h-10 w-full rounded-xl border-gray-200 bg-gray-50 pl-9 pr-10 text-sm shadow-sm transition-all duration-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-200 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                      required
                    />

                    {/* OJO MOSTRAR / OCULTAR */}
                    <button
                      type="button"
                      onClick={MostrarPassword}
                      className="absolute right-2 top-0 h-10 w-10 flex items-center justify-center text-gray-500"
                    >
                      {eye}
                    </button>
                  </div>
                </Field>
              </FieldGroup>

              {/* ERROR */}
              {error && (
                <p className="mt-3 text-center text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* RECUPERAR CONTRASEÑA */}
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleResetClick}
                  className="text-end text-sm text-blue-700 hover:text-blue-400 hover:underline cursor-pointer transition-colors duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* BOTÓN INGRESAR */}
              <DialogFooter className="mt-5">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-10 w-full rounded-xl bg-gradient-to-r from-green-400 via-green-400 to-green-400 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* RESET PASSWORD DIALOG */}
      <ResetPassword
        isOpen={isResetOpen}
        onOpenChange={setIsResetOpen}
        textButton="¿Olvidaste tu contraseña?"
        OnClick={() => {
          setIsResetOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}