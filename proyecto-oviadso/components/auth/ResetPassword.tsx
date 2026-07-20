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
import { Label } from "@/components/ui/label"

type PropsResetPassword = {
  textButton: string;
  OnClick?: () => void;
}

export default function ResetPassword(props: PropsResetPassword) {

    return (
        <Dialog>
            <form>
        <DialogTrigger>
              <a onClick={props.OnClick} className="text-end text-sm text-indigo-500 hover:underline">{props.textButton}</a>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className={"text-center font-bold"}>Recuperar Contraseña </DialogTitle>
                <DialogDescription className="text-center">
                  Ingrese sus credenciales
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="Usuario">Usuario</Label>
                  <Input
                   id="usuario"
                   name="usuario" placeholder="Ingrese usuario o su correo electronico"/>
                </Field>
                
              </FieldGroup>
              <DialogFooter>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">Reestablecer</Button>
              
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>   
          
    );
}