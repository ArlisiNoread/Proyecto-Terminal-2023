//Se definen las interfaces de comunicación con el algoritmo y reglas generales del mismo.

/*
 * Constante que contiene los rangos permitidos para el funcionamiento propio del algoritmo MMC.
 */
export const rangosDeDatosAlgoritmo: RangosDeDatosAlgoritmo = {
  tma: [-100, 100, "decimal"],
  pma: [0, 10000, "decimal"],
  repeticiones: [1, 100, "entero"],
  compositores: [3, 100, "entero"],
  maxEvaluaciones: [1, 10000, "entero"],
  memoria: [4, 100, "entero"],
  pruebas: [10, 100, "entero"],
  fcla: [0.001, 1, "decimal"],
  cfg: [0.001, 1, "decimal"],
  ifg: [0.001, 1, "decimal"],
};

/*
 * Constante que contiene los valores avanzados por defecto del algoritmo MMC.
 */
export const datosAvanzadosAlgoritmoPorDefecto: DatosAvanzadosAlgoritmo = {
  repeticiones: 20,
  compositores: 10,
  maxEvaluaciones: 10,
  memoria: 5,
  pruebas: 30,
  fcla: 0.1,
  cfg: 0.1,
  ifg: 0.1,
};

/*
 * Constante que contiene valores de prueba para el algoritmo
 */
export const datosAlgoritmoDePrueba: DatosAlgoritmo = {
  tma: 30,
  pma: 600,
  ...datosAvanzadosAlgoritmoPorDefecto,
};

//!!!!!!! Desarrollo de Interfaces

/**
 *
 */

export type NombreDatoAlgoritmo =
  | "tma"
  | "pma"
  | "repeticiones"
  | "compositores"
  | "maxEvaluaciones"
  | "memoria"
  | "pruebas"
  | "fcla"
  | "cfg"
  | "ifg";

export type DatosAlgoritmoEstadoReact = {
  tma: string;
  pma: string;
  repeticiones: string;
  compositores: string;
  maxEvaluaciones: string;
  memoria: string;
  pruebas: string;
  fcla: string;
  cfg: string;
  ifg: string;
};

export type DatosBasicosAlgoritmo = {
  tma: number;
  pma: number;
};

export type DatosAvanzadosAlgoritmo = {
  repeticiones: number;
  compositores: number;
  maxEvaluaciones: number;
  memoria: number;
  pruebas: number;
  fcla: number;
  cfg: number;
  ifg: number;
};

export type DatosAlgoritmo = DatosBasicosAlgoritmo & DatosAvanzadosAlgoritmo;

type dominioDeDato = "decimal" | "entero";

type RangosDeDatosAlgoritmo = {
  tma: [number, number, dominioDeDato];
  pma: [number, number, dominioDeDato];
  repeticiones: [number, number, dominioDeDato];
  compositores: [number, number, dominioDeDato];
  maxEvaluaciones: [number, number, dominioDeDato];
  memoria: [number, number, dominioDeDato];
  pruebas: [number, number, dominioDeDato];
  fcla: [number, number, dominioDeDato];
  cfg: [number, number, dominioDeDato];
  ifg: [number, number, dominioDeDato];
};

export type BioclimasAlgoritmo =
  | "semifrío seco"
  | "semifrío"
  | "semifrío húmedo"
  | "templado seco"
  | "templado"
  | "templado húmedo"
  | "cálido seco"
  | "cálido semihúmedo"
  | "cálido húmedo";

export type RecomendacionesAlgoritmo = {
  densidadMuros: "alta" | "baja";
  densidadTechos: "alta" | "baja";
  altura: "alta" | "baja";
  acabado: "claro" | "oscuro";
  ventilacion: "unilateral" | "cruzada";
  transmitanciaDelCristal: "alta" | "baja";
};

export type ResultadoAlgoritmo = {
  fecha: Date;
  bioclima: BioclimasAlgoritmo;
  recomendaciones: RecomendacionesAlgoritmo;
};

//!!!!!!!
