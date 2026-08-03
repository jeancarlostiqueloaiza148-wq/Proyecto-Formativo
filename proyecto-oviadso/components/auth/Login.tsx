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

import ResetPassword from "./ResetPassword";

export default function Login(props: any) {
  return (
    <Dialog>
      {/* BOTÓN QUE ABRE EL LOGIN */}
      <DialogTrigger
        type="button"
        className="
          rounded-3xl
          bg-gradient-to-r
          from-orange-500
          via-amber-500
          to-yellow-400
          px-6
          py-2
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

      {/* CONTENIDO DEL LOGIN */}
      <DialogContent
        className="
          sm:max-w-md
          overflow-hidden
          rounded-[30px]
          border-0
          bg-white
          p-0
          shadow-[0_25px_70px_rgba(0,0,0,0.18)]
        "
      >
        {/* HEADER */}
        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-orange-500
            via-amber-500
            to-yellow-400
            px-8
            py-1
          "
        >
          {/* Decoraciones */}
          <div
            className="
              absolute
              -right-10
              -top-10
              h-36
              w-36
              rounded-full
              bg-white/10
              blur-2xl
            "
          />

          <div
            className="
              absolute
              -bottom-14
              -left-10
              h-40
              w-40
              rounded-full
              bg-white/10
              blur-3xl
            "
          />

          <DialogHeader className="relative z-10 text-center">
            <DialogTitle
              className="
                text-4xl
                font-bold
                tracking-tight
                text-white
              "
            >
              Bienvenido
            </DialogTitle>

            <DialogDescription
              className="
                mt-3
                text-base
                text-orange-100
              "
            >
              Inicia sesión para acceder a tu cuenta
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* CONTENIDO */}
        <div className="px-8 py-8">

          {/* FORMULARIO DE LOGIN */}
          <form>
            <FieldGroup className="space-y-6">

              {/* USUARIO */}
              <Field>
                <Label
                  htmlFor="usuario"
                  className="font-semibold text-gray-700"
                >
                  Usuario
                </Label>

                <Input
                  id="usuario"
                  name="usuario"
                  placeholder="Correo electrónico o usuario"
                  className="
                    mt-2
                    h-12
                    rounded-2xl
                    border-gray-200
                    bg-gray-50
                    px-4
                    text-sm
                    shadow-sm
                    transition-all
                    duration-300
                    focus-visible:border-orange-500
                    focus-visible:ring-2
                    focus-visible:ring-orange-200
                  "
                />
              </Field>

              {/* CONTRASEÑA */}
              <Field>
                <Label
                  htmlFor="password"
                  className="font-semibold text-gray-700"
                >
                  Contraseña
                </Label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="
                    mt-2
                    h-12
                    rounded-2xl
                    border-gray-200
                    bg-gray-50
                    px-4
                    text-sm
                    shadow-sm
                    transition-all
                    duration-300
                    focus-visible:border-orange-500
                    focus-visible:ring-2
                    focus-visible:ring-orange-200
                  "
                />
              </Field>
            </FieldGroup>

            {/* BOTÓN INGRESAR */}
            <DialogFooter className="mt-8">
              <Button
                type="submit"
                className="
                  h-12
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-500
                  via-amber-500
                  to-yellow-400
                  text-base
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-xl
                  active:scale-[0.98]
                "
              >
                Ingresar
              </Button>
            </DialogFooter>
          </form>

          {/* RECUPERAR CONTRASEÑA */}
          <div className="mt-3 flex justify-end">
            <ResetPassword
              textButton="¿Olvidaste tu contraseña?"
            />
          </div>

          {/* TEXTO INFERIOR */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Sistema de Gestión Ovina
            </p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}