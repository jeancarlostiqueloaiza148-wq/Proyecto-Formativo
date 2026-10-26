import { act } from "react";

export const DEFAULT_ROLL = [
    { slug: "superadmin", name_roll: "Super Administrador" },
    { slug: "admin", name_roll: "Administrador" },
    { slug: "instructor", name_roll: "Instructor "},
    { slug: "Gestor", name_roll: "Gestor" },
    { slug: "pasante", name_roll: "Pasante "},
];


export const DEFAULT_APP_ROUTES = [
  {
    name_route: "Usuarios",
    route: "/dashboard/user",
    active: true,
    icono: "fa-solid fa-user",
  },
  {
    name_route: "Responsables",
    route: "/dashboard/responsibles",
    active: true,
    icono: "fa-solid fa-users",
  },
  {
    name_route: "Ovinos",
    route: "/dashboard/ovine",
    active: true,
    icono: "fa-solid fa-sheep",
  },
  {
    name_route: "Peso",
    route: "/dashboard/weight",
    active: true,
    icono: "fa-solid fa-scale-balanced",
  },
  {
    name_route: "Nacimientos",
    route: "/dashboard/birth",
    active: true,
    icono: "fa-solid fa-paw",
  },
  {
    name_route: "Mortalidad",
    route: "/dashboard/mortality",
    active: true,
    icono: "fa-solid fa-skull",
  },
  {
    name_route: "Alimentación",
    route: "/dashboard/feeding",
    active: true,
    icono: "fa-solid fa-wheat-awn",
  },
  {
    name_route: "Sanidad",
    route: "/dashboard/health",
    active: true,
    icono: "fa-solid fa-heart-pulse",
  },
  {
    name_route: "Montas",
    route: "/dashboard/mounting",
    active: true,
    icono: "fa-solid fa-heart",
  },
  {
    name_route: "Partos",
    route: "/dashboard/delivery",
    active: true,
    icono: "fa-solid fa-calendar-heart",
  },
];


export const DEFAULT_ROLL_APP_ROUTES = [];
