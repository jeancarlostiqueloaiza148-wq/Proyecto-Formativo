"use client";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Hooks() {
  // Estado contador
  const [count, setCount] = useState(1);

  // Funcion para imcrementar el contador
  const incrementar = ()=>{
    setCount(count + 1);
  }


  // Funcion para imcrementar el contador
  const decrementar = ()=>{
    setCount(count - 1);
  }

  // Funcion para exponenciar el contador
  const exponenciar = ()=>{
    setCount(count * count);
  }

  // Funcion para dividir el contador
  const dividir = ()=>{
    setCount(count / count);
  }

  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Hooks</h1>
        <div>
             <h2>En click llevas  {count}</h2>
             <Button onClick={incrementar}>Aumentar</Button>
             <Button onClick={decrementar}>Disminuir</Button>
             <Button onClick={exponenciar}>Exponenciar</Button>
             <Button onClick={dividir}>Dividir</Button>
        </div>
      </main>
    </>
  );
}
