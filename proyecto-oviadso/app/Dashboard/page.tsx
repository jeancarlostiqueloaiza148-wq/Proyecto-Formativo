"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  PawPrint,
  Baby,
  HeartHandshake,
  Skull,
  HeartPulse,
  Wheat,
  Scale,
  Users,
  UserRound,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CircleAlert,
} from "lucide-react";

interface Registro {
  [key: string]: any;
}

interface DashboardData {
  totalOvinos: number;
  nacimientosMes: number;
  montasMes: number;
  mortalidadMes: number;
  registrosSanidad: number;
  registrosAlimentacion: number;
  registrosPesaje: number;
  totalUsuarios: number;
  totalResponsables: number;
  proximosPartos: Registro[];
}

const datosIniciales: DashboardData = {
  totalOvinos: 0,
  nacimientosMes: 0,
  montasMes: 0,
  mortalidadMes: 0,
  registrosSanidad: 0,
  registrosAlimentacion: 0,
  registrosPesaje: 0,
  totalUsuarios: 0,
  totalResponsables: 0,
  proximosPartos: [],
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(datosIniciales);

  const cargando = false;

  const hoyFormateado = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl space-y-8 px-4 pb-8 pt-6 md:px-8 md:pt-10">
        {/* Encabezado */}
        <header className="mt-4 flex flex-col items-center gap-5 pb-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-start gap-4">
            <div>
              <span className="text-3xl">👋</span>
            </div>

            <div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">
                Bienvenido a OVIADSO
              </h1>
            </div>
          </div>

        </header>

        {/* Resumen general */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="Resumen pecuario"
            descripcion="Vista general de los módulos de la unidad ovina."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <IndicadorCompacto
              titulo="Ovinos registrados"
              valor={data.totalOvinos}
              icono={<PawPrint className="h-5 w-5" />}
              cargando={cargando}
            />

            <IndicadorCompacto
              titulo="Nacimientos del mes"
              valor={data.nacimientosMes}
              icono={<Baby className="h-5 w-5" />}
              cargando={cargando}
            />

            <IndicadorCompacto
              titulo="Montas del mes"
              valor={data.montasMes}
              icono={<HeartHandshake className="h-5 w-5" />}
              cargando={cargando}
            />

            <IndicadorCompacto
              titulo="Muertes del mes"
              valor={data.mortalidadMes}
              icono={<Skull className="h-5 w-5" />}
              cargando={cargando}
            />
          </div>
        </section>

        {/* Módulo de reproducción */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="1. Reproducción"
            descripcion="Seguimiento de nacimientos, montas y fechas de parto."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <IndicadorCompacto
              titulo="Nacimientos del mes"
              valor={data.nacimientosMes}
              icono={<Baby className="h-5 w-5" />}
              cargando={cargando}
            />

            <IndicadorCompacto
              titulo="Montas del mes"
              valor={data.montasMes}
              icono={<HeartHandshake className="h-5 w-5" />}
              cargando={cargando}
            />

            <IndicadorCompacto
              titulo="Próximos partos"
              valor={data.proximosPartos.length}
              icono={<CalendarDays className="h-5 w-5" />}
              cargando={cargando}
            />
          </div>
        </section>

        {/* Módulo de sanidad */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="2. Sanidad y mortalidad"
            descripcion="Registros sanitarios activos y eventos de mortalidad."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <IndicadorCompacto
              titulo="Registros sanitarios"
              valor={data.registrosSanidad}
              icono={<HeartPulse className="h-5 w-5" />}
              cargando={cargando}
            />

            <IndicadorCompacto
              titulo="Muertes del mes"
              valor={data.mortalidadMes}
              icono={<Skull className="h-5 w-5" />}
              cargando={cargando}
            />
          </div>
        </section>

        {/* Módulo de alimentación */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="3. Alimentación"
            descripcion="Control de los registros de alimentación."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <IndicadorCompacto
              titulo="Registros de alimentación"
              valor={data.registrosAlimentacion}
              icono={<Wheat className="h-5 w-5" />}
              cargando={cargando}
            />
          </div>
        </section>

        {/* Módulo de pesaje */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="4. Control de peso"
            descripcion="Seguimiento de los registros de pesaje de los ovinos."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <IndicadorCompacto
              titulo="Registros de pesaje"
              valor={data.registrosPesaje}
              icono={<Scale className="h-5 w-5" />}
              cargando={cargando}
            />
          </div>
        </section>

        {/* Actividad pecuaria */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="Actividad pecuaria"
            descripcion="Detalle de los registros de los módulos."
          />

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Actividad</th>

                  <th className="px-4 py-3 text-right font-medium">
                    Registros
                  </th>

                  <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                <FilaActividad
                  nombre="Ovinos registrados"
                  descripcion="Total de ovinos registrados en el sistema"
                  valor={data.totalOvinos}
                  icono={<PawPrint className="h-4 w-4" />}
                />

                <FilaActividad
                  nombre="Nacimientos"
                  descripcion="Registros del mes actual"
                  valor={data.nacimientosMes}
                  icono={<Baby className="h-4 w-4" />}
                />

                <FilaActividad
                  nombre="Montas"
                  descripcion="Registros del mes actual"
                  valor={data.montasMes}
                  icono={<HeartHandshake className="h-4 w-4" />}
                />

                <FilaActividad
                  nombre="Mortalidad"
                  descripcion="Muertes de este mes"
                  valor={data.mortalidadMes}
                  icono={<Skull className="h-4 w-4" />}
                />

                <FilaActividad
                  nombre="Sanidad"
                  descripcion="Registros sanitarios activos"
                  valor={data.registrosSanidad}
                  icono={<HeartPulse className="h-4 w-4" />}
                />

                <FilaActividad
                  nombre="Alimentación"
                  descripcion="Registros activos"
                  valor={data.registrosAlimentacion}
                  icono={<Wheat className="h-4 w-4" />}
                />

                <FilaActividad
                  nombre="Pesajes"
                  descripcion="Registros activos"
                  valor={data.registrosPesaje}
                  icono={<Scale className="h-4 w-4" />}
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* Administración */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="5. Administración"
            descripcion="Resumen de las cuentas y los responsables del sistema."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <IndicadorCompacto
              titulo="Usuarios registrados"
              valor={data.totalUsuarios}
              icono={<Users className="h-5 w-5" />}
              cargando={cargando}
            />

            <IndicadorCompacto
              titulo="Responsables"
              valor={data.totalResponsables}
              icono={<UserRound className="h-5 w-5" />}
              cargando={cargando}
            />
          </div>
        </section>

        {/* Distribución de registros */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="Distribución de registros"
            descripcion="Comparación entre los módulos de sanidad, alimentación y pesaje."
          />

          <div className="space-y-5 rounded-lg border p-5">
            <BarraModulo
              titulo="Sanidad"
              valor={data.registrosSanidad}
              maximo={Math.max(
                data.registrosSanidad,
                data.registrosAlimentacion,
                data.registrosPesaje,
                1,
              )}
              color="bg-red-500"
            />

            <BarraModulo
              titulo="Alimentación"
              valor={data.registrosAlimentacion}
              maximo={Math.max(
                data.registrosSanidad,
                data.registrosAlimentacion,
                data.registrosPesaje,
                1,
              )}
              color="bg-emerald-500"
            />

            <BarraModulo
              titulo="Pesajes"
              valor={data.registrosPesaje}
              maximo={Math.max(
                data.registrosSanidad,
                data.registrosAlimentacion,
                data.registrosPesaje,
                1,
              )}
              color="bg-orange-500"
            />
          </div>
        </section>

        {/* Seguimiento de partos */}
        <section className="space-y-4">
          <EncabezadoSeccion
            titulo="Seguimiento de partos"
            descripcion="Vista previa del seguimiento de las fechas de parto."
          />

          <div className="overflow-hidden rounded-lg border">
            <div className="flex flex-col items-center justify-center gap-2 p-10 text-center">
              <CalendarDays className="h-8 w-8 text-muted-foreground" />

              <p className="font-medium">No hay fechas futuras disponibles</p>

              <p className="text-sm text-muted-foreground">
                Los registros aparecerán aquí cuando se conecte el
                funcionamiento del sistema.
              </p>
            </div>
          </div>
        </section>

        {/* Pie de página */}
        <footer className="flex flex-col justify-between gap-2 border-t pt-5 text-xs text-muted-foreground sm:flex-row">
          <p>OVIADSO · Sistema de Gestión Ovina</p>

          <p>Centro Agropecuario La Granja · SENA Regional Tolima</p>
        </footer>
      </div>
    </main>
  );
}

function EncabezadoSeccion({
  titulo,
  descripcion,
}: {
  titulo: string;
  descripcion: string;
}) {
  return (
    <div className="border-l-4 border-orange-500 pl-3">
      <h2 className="text-lg font-semibold tracking-tight">{titulo}</h2>

      <p className="mt-1 text-sm text-muted-foreground">{descripcion}</p>
    </div>
  );
}

function IndicadorCompacto({
  titulo,
  valor,
  icono,
  cargando,
}: {
  titulo: string;
  valor: number;
  icono: ReactNode;
  cargando: boolean;
}) {
  return (
    <div className="min-w-0 rounded-lg border bg-background p-4 transition-colors hover:bg-muted/30 sm:p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
          {icono}
        </div>

        <span className="text-sm font-medium">{titulo}</span>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        {cargando ? "—" : valor}
      </p>
    </div>
  );
}

function FilaActividad({
  nombre,
  descripcion,
  valor,
  icono,
}: {
  nombre: string;
  descripcion: string;
  valor: number;
  icono: ReactNode;
}) {
  return (
    <tr className="transition-colors hover:bg-muted/40">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-background text-orange-600">
            {icono}
          </div>

          <div>
            <p className="font-medium">{nombre}</p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {descripcion}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-right font-semibold tabular-nums">
        {valor}
      </td>

      <td className="hidden px-4 py-3 text-right sm:table-cell">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          Vista previa
        </span>
      </td>
    </tr>
  );
}

function BarraModulo({
  titulo,
  valor,
  maximo,
  color,
}: {
  titulo: string;
  valor: number;
  maximo: number;
  color: string;
}) {
  const porcentaje = maximo > 0 ? Math.min((valor / maximo) * 100, 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{titulo}</span>

        <span className="tabular-nums text-muted-foreground">
          {valor} registros
        </span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label={`Registros de ${titulo}`}
        aria-valuemin={0}
        aria-valuemax={maximo}
        aria-valuenow={Math.min(valor, maximo)}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}
