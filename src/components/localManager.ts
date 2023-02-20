import { ResultadoAlgoritmo } from "./auxiliaresDelAlgoritmo";
import * as ls from "local-storage";

const arrayResultadosNombre: string = "arrayResultados";

export const almacenarResultado = (resultadoAlgoritmo: ResultadoAlgoritmo) => {
  const arrayResultados: ResultadoAlgoritmo[] = ls.get<ResultadoAlgoritmo[]>(
    arrayResultadosNombre
  );

  if (!arrayResultados) {
    const nuevoArrayResultadoAlgoritmo: ResultadoAlgoritmo[] = [
      resultadoAlgoritmo,
    ];

    ls.set<ResultadoAlgoritmo[]>(
      arrayResultadosNombre,
      nuevoArrayResultadoAlgoritmo
    );
  } else {
    arrayResultados.push(resultadoAlgoritmo);
    ls.set<ResultadoAlgoritmo[]>(arrayResultadosNombre, arrayResultados);
  }
};

export const obtenerVectorResultados = (): ResultadoAlgoritmo[] => {
  const arrayResultados: ResultadoAlgoritmo[] = ls.get<ResultadoAlgoritmo[]>(
    arrayResultadosNombre
  );
  if (arrayResultados) return arrayResultados;
  return [];
};

export const eliminarResultado = (index: number) => {
  const arrayResultados: ResultadoAlgoritmo[] = ls.get<ResultadoAlgoritmo[]>(
    arrayResultadosNombre
  );

  if (index < arrayResultados.length) {
    arrayResultados.splice(index, 1);
    ls.set<ResultadoAlgoritmo[]>(arrayResultadosNombre, arrayResultados);
  }
};
