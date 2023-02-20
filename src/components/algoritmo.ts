import { Matrix } from "ml-matrix";
import Configuracion from "./datosAlgoritmo/Configuracion";
import PPDCDMX from "./datosAlgoritmo/PPDCDMX";
import PMVCDMX from "./datosAlgoritmo/PMVCDMX";
import TRMCDMX from "./datosAlgoritmo/TRMCDMX";
import PPDChihuahua from "./datosAlgoritmo/PPDChihuahua";
import PMVChihuahua from "./datosAlgoritmo/PMVChihuahua";
import TRMChihuahua from "./datosAlgoritmo/TRMChihuahua";
import PPDXalapa from "./datosAlgoritmo/PPDXalapa";
import PMVXalapa from "./datosAlgoritmo/PMVXalapa";
import TRMXalapa from "./datosAlgoritmo/TRMXalapa";
import PPDCancun from "./datosAlgoritmo/PPDCancun";
import PMVCancun from "./datosAlgoritmo/PMVCancun";
import TRMCancun from "./datosAlgoritmo/TRMCancun";
import PPDColima from "./datosAlgoritmo/PPDColima";
import PMVColima from "./datosAlgoritmo/PMVColima";
import TRMColima from "./datosAlgoritmo/TRMColima";
import PPDPuebla from "./datosAlgoritmo/PPDPuebla";
import PMVPuebla from "./datosAlgoritmo/PMVPuebla";
import TRMPuebla from "./datosAlgoritmo/TRMPuebla";
import PPDNayarit from "./datosAlgoritmo/PPDNayarit";
import PMVNayarit from "./datosAlgoritmo/PMVNayarit";
import TRMNayarit from "./datosAlgoritmo/TRMNayarit";
import PPDCelaya from "./datosAlgoritmo/PPDCelaya";
import PMVCelaya from "./datosAlgoritmo/PMVCelaya";
import TRMCelaya from "./datosAlgoritmo/TRMCelaya";
import PPDGuadalajara from "./datosAlgoritmo/PPDGuadalajara";
import PMVGuadalajara from "./datosAlgoritmo/PMVGuadalajara";
import TRMGuadalajara from "./datosAlgoritmo/TRMGuadalajara";
import {
  BioclimasAlgoritmo,
  DatosAlgoritmo,
  ResultadoAlgoritmo,
} from "./auxiliaresDelAlgoritmo";
import { RecomendacionesAlgoritmo } from "./auxiliaresDelAlgoritmo";

onmessage = (message: MessageEvent<MensajeAlgoritmoArranque>) => {
  if (message.data?.mensaje === "iniciar") {
    start_Promise_Algorithm(message.data.datosAlgoritmo);
  }
};

export type MensajeAlgoritmoArranque = {
  mensaje: "iniciar";
  datosAlgoritmo: DatosAlgoritmo;
};

export type MensajeAlgoritmo = MensajeProgreso | MensajeFinal;

type MensajeProgreso = {
  mensaje: "progreso";
  progreso: {
    porcentaje: number;
    performance: number;
  };
};

type MensajeFinal = {
  mensaje: "resultado";
  resultadoAlgoritmo: ResultadoAlgoritmo;
};

const enviarMensaje = (mensajeAlgoritmo: MensajeAlgoritmo) => {};

const enviarMensajeProgreso = (iteracion: number, iteraciones: number) => {
  const mensajeProgreso: MensajeProgreso = {
    mensaje: "progreso",
    progreso: {
      porcentaje: (100 * iteracion) / iteraciones,
      performance: performance.now(),
    },
  };
  postMessage(mensajeProgreso);
};

const enviarMensajeFinal = (
  bioclima: BioclimasAlgoritmo,
  recomendacionesAlgoritmo: RecomendacionesAlgoritmo
) => {
  const mensajeFinal: MensajeFinal = {
    mensaje: "resultado",
    resultadoAlgoritmo: {
      fecha: new Date(),
      bioclima: bioclima,
      recomendaciones: recomendacionesAlgoritmo,
    },
  };
  postMessage(mensajeFinal);
};

const determinarBioclima = (tma: number, pma: number): BioclimasAlgoritmo => {
  if (tma < 21 && pma < 650) {
    return "semifrío seco";
  } else if (tma < 21 && pma >= 650 && pma <= 1000) {
    return "semifrío seco";
  } else if (tma < 21 && pma > 1000) {
    return "semifrío húmedo";
  } else if (tma >= 21 && tma <= 26 && pma < 650) return "templado seco";
  else if (tma >= 21 && tma <= 26 && pma >= 650 && pma <= 1000) {
    return "templado";
  } else if (tma >= 21 && tma <= 26 && pma > 1000) {
    return "templado húmedo";
  } else if (tma > 26 && pma < 650) {
    return "cálido seco";
  } else if (tma > 26 && pma >= 650 && pma <= 1000) {
    return "cálido semihúmedo";
  } else {
    return "cálido húmedo";
  }
};

/**
 * Estrella del escenario: ¡Algoritmo del Método Musical!
 * ¡Que empiece la música!
 * */
const start_Promise_Algorithm = async (data: DatosAlgoritmo) => {
  const compositores: number = data.compositores;
  const repeticiones: number = data.repeticiones;
  const maxEvaluaciones: number = data.maxEvaluaciones;
  const fcla: number = data.fcla;
  const cfg: number = data.cfg;
  const ifg: number = data.ifg;
  const memoria: number = data.memoria;
  const pruebas: number = data.pruebas;
  const tma: number = data.tma;
  const pma: number = data.pma;

  let sol: Matrix = new Matrix(0, 12 + 4);
  const configuration_size: number = Configuracion.length;

  for (let repeticion = 0; repeticion < repeticiones; repeticion++) {
    enviarMensajeProgreso(repeticion, repeticiones);

    let ppd = new Matrix([[]]);
    let pmv = new Matrix([[]]);
    let trm = new Matrix([[]]);

    let disTT: number = 0;

    //Reinicio Matrices
    let sol_corrida: Matrix = Matrix.zeros(memoria * compositores, 12);
    let objetivos: Matrix = Matrix.zeros(memoria * compositores, 4);

    //Soluciones Iniciales
    for (let i = 0; i < memoria * compositores; i++) {
      for (let t = 0; t < 6; t = t + 2) {
        const randomNumber = Math.round(Math.random());
        sol_corrida.set(i, t, randomNumber);
        sol_corrida.set(i, t + 1, 1 - randomNumber);
      }

      let distancias = Matrix.zeros(1, configuration_size);
      for (let j = 0; j < configuration_size; j++) {
        let tempSumatoria = 0.0;
        for (let jk = 0; jk < 12; jk++) {
          const tempDiferencia = Configuracion[j][jk] - sol_corrida.get(i, jk);
          const pow2TempDiferencia = tempDiferencia * tempDiferencia;
          tempSumatoria += pow2TempDiferencia;
        }
        distancias.set(0, j, Math.sqrt(tempSumatoria));
      }

      let posicionDistanciaMinima = distancias.minIndex();

      let [ppd, pmv, trm]: [Matrix, Matrix, Matrix] = funcion_datos(
        pruebas,
        tma,
        pma
      );

      disTT = trm.max() - trm.min();

      for (let k = 0; k < 6; k++) {
        if (ppd.get(posicionDistanciaMinima[1], k) > 15.0) {
          objetivos.set(
            i,
            0,
            objetivos.get(i, 0) +
              ((1.0 / 6.0) * (15 - ppd.get(posicionDistanciaMinima[1], k))) /
                -85.0
          );
        }
        if (pmv.get(posicionDistanciaMinima[1], k) !== 0.0) {
          objetivos.set(
            i,
            1,
            objetivos.get(i, 1) +
              ((1.0 / 6.0) * Math.abs(pmv.get(posicionDistanciaMinima[1], k))) /
                3.0
          );
        }

        if (
          trm.get(posicionDistanciaMinima[1], k) < 18.0 ||
          trm.get(posicionDistanciaMinima[1], k) > 23.0
        ) {
          let auxTemp = Math.max(
            18.0 - trm.get(posicionDistanciaMinima[1], k),
            23.0 - trm.get(posicionDistanciaMinima[1], k)
          );
          objetivos.set(
            i,
            2,
            objetivos.get(i, 2) + ((1.0 / 6.0) * Math.abs(auxTemp)) / disTT
          );
        }
        objetivos.set(
          i,
          3,
          Math.max(
            objetivos.get(i, 0),
            objetivos.get(i, 1),
            objetivos.get(i, 2)
          )
        );
      }

      objetivos.mul(1.0 / 5.0);

      let links = Matrix.zeros(compositores, compositores);

      for (let v = 0; v < maxEvaluaciones; v++) {
        //Creamos los vínculos
        links = vinculos(compositores, fcla, v, links);
        let contadores: Matrix = Matrix.zeros(compositores, 6);
        let sol_corrida1 = sol_corrida.clone();
        let objetivos2 = objetivos.clone();

        for (let i = 0; i < compositores; i++) {
          let a = i * memoria;
          let b = a + memoria - 1;

          let A: Matrix = objetivos.subMatrix(a, b, 0, objetivos.columns - 1);

          contadores.set(i, 0, A.maxColumn(3));
          contadores.set(i, 1, A.maxColumnIndex(3)[1]);
          contadores.set(i, 2, A.minColumn(3));
          contadores.set(i, 3, A.minColumnIndex(3)[1]);

          contadores.set(i, 1, contadores.get(i, 1) + i * memoria);
          contadores.set(i, 3, contadores.get(i, 3) + i * memoria);
          contadores.set(i, 4, a);
          contadores.set(i, 5, b);
        }

        let MI = new Matrix(0, 12);
        let MIo = new Matrix(0, 4);
        let destino = new Matrix(1, 0);

        for (let i = 0; i < compositores; i++) {
          for (let j = 0; j < compositores; j++) {
            if (i !== j) {
              if (links.get(j, i) === 1.0) {
                if (contadores.get(j, 0) < contadores.get(i, 0)) {
                  let seleccion = Math.round(
                    Math.random() *
                      (contadores.get(j, 5) - contadores.get(j, 4)) +
                      contadores.get(j, 4)
                  );
                  MI.addRow(MI.rows, sol_corrida.getRowVector(seleccion));
                  MIo.addRow(MIo.rows, objetivos.getRowVector(seleccion));
                  destino.addColumn(destino.columns, [i]);
                }
              }
            }
          }
        }

        let aux3: Matrix;

        for (let i = 0; i < compositores; i++) {
          let a = i * memoria;
          let b = a + memoria - 1;

          let MIndividual = sol_corrida.subMatrix(
            a,
            b,
            0,
            sol_corrida.columns - 1
          );

          let MIIndividualObjetivos = objetivos.subMatrix(
            a,
            b,
            0,
            objetivos.columns - 1
          );

          let IA: Matrix = Matrix.zeros(0, MI.columns);
          let IAo: Matrix = Matrix.zeros(0, MIo.columns);

          for (let k = 0; k < MI.rows; k++) {
            if (destino.get(0, k) === i) {
              IA.addRow(IA.rows, MI.getRowVector(k));
              IAo.addRow(IAo.rows, MIo.getRowVector(k));
            }
          }

          if (Math.random() <= cfg) {
            let MK: Matrix = new Matrix(
              MIndividual.rows + IA.rows,
              MIndividual.columns
            );
            MK.setSubMatrix(MIndividual.clone(), 0, 0);
            MK.setSubMatrix(IA.clone(), MIndividual.rows, 0);

            let MKo: Matrix = new Matrix(
              MIIndividualObjetivos.rows + IAo.rows,
              MIIndividualObjetivos.columns
            );

            MKo.setSubMatrix(MIIndividualObjetivos.clone(), 0, 0);
            MKo.setSubMatrix(IAo.clone(), MIIndividualObjetivos.rows, 0);

            let peor: number = MKo.maxColumn(3);
            let mejor: number = MKo.minColumn(3);

            let diferencia: number = peor - mejor;
            let preponderancia: Matrix = Matrix.zeros(1, MKo.rows);

            if (diferencia === 0.0) {
              preponderancia = Matrix.zeros(1, MKo.rows).mul(1.0 / MKo.rows);
            } else {
              let MKoColumn3 = MKo.getColumnVector(3);
              preponderancia.apply((i, j) => {
                preponderancia.set(
                  i,
                  j,
                  0.1 + (peor - MKo.get(j, 3)) / diferencia
                );
              });
            }
            preponderancia.pow(2);

            let maxPreponderanciaRedondeada = Math.round(preponderancia.max());
            let filtrado = MK.getRowVector(maxPreponderanciaRedondeada);

            let c1: Matrix = new Matrix(1, 0);

            c1.addColumn(c1.columns, [
              preponderancia.get(0, maxPreponderanciaRedondeada),
            ]);

            preponderancia.set(0, maxPreponderanciaRedondeada, 0.0);

            preponderancia.mul(1.0 / preponderancia.sum());

            let seleccion: number = Math.random();
            let p = 0.0;
            let ps = 0.0;

            while (p < seleccion && ps < MKo.rows) {
              ps = ps + 1;
              p = p + preponderancia.get(0, ps - 1);
            }

            filtrado.addRow(filtrado.rows, MK.getRowVector(ps - 1));

            c1.addColumn(c1.columns, [preponderancia.get(0, ps - 1)]);

            seleccion = Math.round(Math.random() * (MKo.rows - 1));

            filtrado.addRow(filtrado.rows, MK.getRowVector(seleccion));

            c1.addColumn(c1.columns, [preponderancia.get(0, seleccion)]);

            c1.mul(1.0 / c1.sum());

            aux3 = c1.mmul(filtrado);

            for (let iii = 0; iii < MK.columns - 1; iii = iii + 2) {
              if (Math.random() <= ifg) {
                aux3.set(0, iii, Math.pow(1.0 - aux3.get(0, iii), 2));
                aux3.set(0, iii + 1, Math.pow(1.0 - aux3.get(0, iii), 2));
              } else {
                aux3.set(0, iii + 1, Math.pow(1.0 - aux3.get(0, iii), 2));
              }
            }
          } else {
            aux3 = new Matrix(1, 0);
            let j = 0;
            for (let k = 0; k < 6; k++) {
              aux3.addColumn(aux3.columns, [Math.round(Math.random())]);
              aux3.addColumn(aux3.columns, [Math.pow(1 - aux3.get(0, j), 2)]);
              j += 2;
            }
          }

          let distancias: Matrix = Matrix.zeros(1, Configuracion.length);

          for (let j = 0; j < Configuracion.length; j++) {
            let tempMat: Matrix = new Matrix(1, 0);
            for (let xx = 0; xx < Configuracion[0].length; xx++) {
              tempMat.addColumn(tempMat.columns, [
                Math.pow(Configuracion[j][xx] - sol_corrida.get(i, xx), 2),
              ]);
            }
            distancias.set(0, j, Math.sqrt(tempMat.sum()));
          }

          let distanciaMinimaCoord = distancias.minIndex()[1]; //solo es una row

          let objetivos1 = Matrix.zeros(1, 4);

          for (let k = 0; k < 6; k++) {
            if (ppd.get(distanciaMinimaCoord, k) > 15) {
              objetivos1.set(
                0,
                0,
                objetivos1.get(0, 0) +
                  (1.0 / 6.0) *
                    ((15.0 - ppd.get(distanciaMinimaCoord, k)) / -85.0)
              );
            }
            if (pmv.get(distanciaMinimaCoord, k) !== 0.0) {
              objetivos1.set(
                0,
                1,
                objetivos1.get(0, 1) +
                  (1.0 / 6.0) *
                    (Math.abs(pmv.get(distanciaMinimaCoord, k)) / 3.0)
              );
            }
            if (
              trm.get(distanciaMinimaCoord, k) < 18 ||
              trm.get(distanciaMinimaCoord, k) > 23
            ) {
              let tempAux = Math.max(
                18 - trm.get(distanciaMinimaCoord, k),
                23 - trm.get(distanciaMinimaCoord, k)
              );
              objetivos1.set(
                0,
                2,
                objetivos1.get(0, 2) + ((1.0 / 6.0) * Math.abs(tempAux)) / disTT
              );
            }
          }

          objetivos1.mul(1.0 / 5.0);

          if (objetivos1.get(0, 3) < contadores.get(i, 0)) {
            for (let xx = 0; xx < aux3.columns; xx++) {
              sol_corrida1.set(
                Math.round(contadores.get(i, 1)),
                xx,
                Math.round(aux3.get(0, xx))
              );
            }
            for (let xx = 0; xx < objetivos1.columns; xx++) {
              objetivos2.set(
                Math.round(contadores.get(i, 1)),
                xx,
                objetivos1.get(0, xx)
              );
            }
          }
        }

        sol_corrida = sol_corrida1.clone();
        objetivos = objetivos2.clone();
      }

      let minObjetivoCoord = objetivos.minColumnIndex(3)[0];

      let res_sol = Matrix.zeros(1, 16);

      for (let xx = 0; xx < 12; xx++) {
        res_sol.set(0, xx, sol_corrida.get(minObjetivoCoord, xx));
      }
      for (let xx = 0; xx < 4; xx++) {
        res_sol.set(0, xx + 13, objetivos.get(minObjetivoCoord, xx));
      }

      sol.addRow(sol.rows, res_sol);
    }
  }

  let resultado: number[] = [];
  for (let a = 0; a < sol.columns; a++) {
    resultado.push(
      Math.round(sol.subMatrixColumn([a], 0, sol.rows - 1).mean())
    );
  }

  console.log(resultado.toString());

  const recomendacion: RecomendacionesAlgoritmo = {
    densidadMuros: resultado[0] === 0 ? "alta" : "baja",
    densidadTechos: resultado[1] === 0 ? "alta" : "baja",
    altura: resultado[2] === 0 ? "alta" : "baja",
    acabado: resultado[3] === 0 ? "claro" : "oscuro",
    ventilacion: resultado[4] === 0 ? "unilateral" : "cruzada",
    transmitanciaDelCristal: resultado[5] === 0 ? "alta" : "baja",
  };
  enviarMensajeProgreso(repeticiones, repeticiones);
  enviarMensajeFinal(determinarBioclima(tma, pma), recomendacion);
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const funcion_datos = (
  pruebas: number,
  temperatura: number,
  precipitacion: number
): [Matrix, Matrix, Matrix] => {
  let datosRowLength: number = TRMCDMX.length;
  let datosColLength: number = TRMCDMX[0].length;

  let distancia = new Matrix(1, 9);

  //Distancia de datos CDMX
  distancia.set(
    0,
    0,
    Math.sqrt(
      Math.pow(17.1 - temperatura, 2) + Math.pow(886 - precipitacion, 2)
    )
  );

  //Distancia de datos Chihuahua
  distancia.set(
    0,
    1,
    Math.sqrt(
      Math.pow(19.9 - temperatura, 2) + Math.pow(553.0 - precipitacion, 2)
    )
  );

  //Distancia de datos Xalapa
  distancia.set(
    0,
    2,
    Math.sqrt(
      Math.pow(18.5 - temperatura, 2) + Math.pow(1177.0 - precipitacion, 2)
    )
  );

  //Distancia de datos Cancún
  distancia.set(
    0,
    3,
    Math.sqrt(
      Math.pow(25.6 - temperatura, 2) + Math.pow(1221.0 - precipitacion, 2)
    )
  );

  //Distancia de datos Colima
  distancia.set(
    0,
    4,
    Math.sqrt(
      Math.pow(25.3 - temperatura, 2) + Math.pow(1678.0 - precipitacion, 2)
    )
  );

  //Distancia de datos Puebla
  distancia.set(
    0,
    5,
    Math.sqrt(
      Math.pow(16.8 - temperatura, 2) + Math.pow(1076.0 - precipitacion, 2)
    )
  );

  //Distancia de datos Nayarit
  distancia.set(
    0,
    6,
    Math.sqrt(
      Math.pow(25 - temperatura, 2) + Math.pow(1100.0 - precipitacion, 2)
    )
  );

  //Distancia de datos Celaya
  distancia.set(
    0,
    7,
    Math.sqrt(
      Math.pow(18.6 - temperatura, 2) + Math.pow(543.0 - precipitacion, 2)
    )
  );

  //Distancia de datos Guadalajara
  distancia.set(
    0,
    8,
    Math.sqrt(
      Math.pow(19.2 - temperatura, 2) + Math.pow(791 - precipitacion, 2)
    )
  );

  let valMinDistancia = distancia.min();
  let valMaxDistancia = distancia.max();

  let diferencia = valMaxDistancia - valMinDistancia;

  let diferenciaTemp = [];
  for (let zz = 0; zz < distancia.columns; zz++) {
    diferenciaTemp.push(
      (0.01 + valMaxDistancia - distancia.get(0, zz)) / diferencia
    );
  }

  let sumaTemp = diferenciaTemp.reduce((a, b) => a + b, 0);

  for (let zz = 0; zz < diferenciaTemp.length; zz++) {
    if (sumaTemp !== 0) {
      diferenciaTemp[zz] /= sumaTemp;
    }
  }

  let ppd: Matrix = Matrix.zeros(datosRowLength, datosColLength);
  let pmv: Matrix = Matrix.zeros(datosRowLength, datosColLength);
  let trm: Matrix = Matrix.zeros(datosRowLength, datosColLength);

  for (let p = 0; p < pruebas; p++) {
    let diferenciaTemp2 = [];
    for (let q = 0; q < diferenciaTemp.length; q++) {
      diferenciaTemp2.push(diferenciaTemp[q] + Math.random());
    }

    let min1: number = Math.min(...diferenciaTemp2);

    for (let q = 0; q < diferenciaTemp2.length; q++) {
      diferenciaTemp2[q] += Math.abs(min1) + 1.0 / 10.0;
    }
    let sumaTemp = diferenciaTemp2.reduce((a, b) => a + b, 0);
    for (let q = 0; q < diferenciaTemp2.length; q++) {
      if (sumaTemp !== 0) diferenciaTemp2[q] /= sumaTemp;
    }

    for (let x = 0; x < datosRowLength; x++) {
      for (let y = 0; y < datosColLength; y++) {
        let tempPPD = ppd.get(x, y);
        tempPPD += diferenciaTemp2[0] * PPDCDMX[x][y];
        tempPPD += diferenciaTemp2[1] * PPDXalapa[x][y];
        tempPPD += diferenciaTemp2[2] * PPDChihuahua[x][y];
        tempPPD += diferenciaTemp2[3] * PPDCancun[x][y];
        tempPPD += diferenciaTemp2[4] * PPDColima[x][y];
        tempPPD += diferenciaTemp2[5] * PPDPuebla[x][y];
        tempPPD += diferenciaTemp2[6] * PPDNayarit[x][y];
        tempPPD += diferenciaTemp2[7] * PPDCelaya[x][y];
        tempPPD += diferenciaTemp2[8] * PPDGuadalajara[x][y];
        ppd.set(x, y, tempPPD);

        let tempPMV = pmv.get(x, y);
        tempPMV += diferenciaTemp2[0] * PMVCDMX[x][y];
        tempPMV += diferenciaTemp2[1] * PMVXalapa[x][y];
        tempPMV += diferenciaTemp2[2] * PMVChihuahua[x][y];
        tempPMV += diferenciaTemp2[3] * PMVCancun[x][y];
        tempPMV += diferenciaTemp2[4] * PMVColima[x][y];
        tempPMV += diferenciaTemp2[5] * PMVPuebla[x][y];
        tempPMV += diferenciaTemp2[6] * PMVNayarit[x][y];
        tempPMV += diferenciaTemp2[7] * PMVCelaya[x][y];
        tempPMV += diferenciaTemp2[8] * PMVGuadalajara[x][y];
        pmv.set(x, y, tempPMV);

        let tempTRM = trm.get(x, y);
        tempTRM += diferenciaTemp2[0] * TRMCDMX[x][y];
        tempTRM += diferenciaTemp2[1] * TRMXalapa[x][y];
        tempTRM += diferenciaTemp2[2] * TRMChihuahua[x][y];
        tempTRM += diferenciaTemp2[3] * TRMCancun[x][y];
        tempTRM += diferenciaTemp2[4] * TRMColima[x][y];
        tempTRM += diferenciaTemp2[5] * TRMPuebla[x][y];
        tempTRM += diferenciaTemp2[6] * TRMNayarit[x][y];
        tempTRM += diferenciaTemp2[7] * TRMCelaya[x][y];
        tempTRM += diferenciaTemp2[8] * TRMGuadalajara[x][y];

        trm.set(x, y, tempTRM);
      }
    }
  }

  for (let x = 0; x < datosRowLength; x++) {
    for (let y = 0; y < datosColLength; y++) {
      ppd.set(x, y, (1.0 / pruebas) * ppd.get(x, y));
      pmv.set(x, y, (1.0 / pruebas) * pmv.get(x, y));
      trm.set(x, y, (1.0 / pruebas) * trm.get(x, y));
    }
  }

  return [ppd, pmv, trm];
};

const vinculos = (
  compositores: number,
  fcla: number,
  evaluacion: number,
  oldLinks: Matrix
) => {
  let links = Matrix.zeros(compositores, compositores);

  if (evaluacion === 0) {
    for (let i = 0; i < compositores; i++) {
      for (let j = i; j < compositores; j++) {
        if (i === j) {
          links.set(i, j, 0.0);
        } else {
          if (Math.random() <= fcla) {
            links.set(i, j, 1.0);
          } else {
            links.set(i, j, 0.0);
          }
        }
      }
    }
  } else {
    for (let i = 0; i < compositores; i++) {
      for (let j = 0; j < compositores; j++) {
        if (i === j) {
          links.set(i, j, 0.0);
        } else {
          if (Math.random() <= fcla) {
            links.set(i, j, Math.pow(oldLinks.get(i, j) - 1, 2));
          } else {
            links.set(i, j, oldLinks.get(i, j));
          }
        }
      }
    }
  }

  for (let i = 0; i < compositores; i++) {
    let aux = links.getRowVector(i).sum();
    if (aux === 0.0) {
      let seleccion = Math.round(Math.random() * compositores);
      while (seleccion === i) {
        seleccion = Math.round(Math.random() * compositores);
      }
      links.set(i, seleccion, 1.0);
    }
  }

  return links;
};
