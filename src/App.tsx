import { IonApp, setupIonicReact } from '@ionic/react';
import { useRef, useCallback } from "react";
import { ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from './components/AppBar';
import TabsManager from './components/TabsManager';
import Tab1 from './components/Tab1';
import Tab2 from './components/Tab2';
import Tab3 from './components/Tab3';
import { Paper } from '@mui/material';
import { DatosAlgoritmo, DatosAlgoritmoEstadoReact, DatosAvanzadosAlgoritmo, datosAvanzadosAlgoritmoPorDefecto, DatosBasicosAlgoritmo, ResultadoAlgoritmo } from './components/auxiliaresDelAlgoritmo';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import { MensajeAlgoritmo, MensajeAlgoritmoArranque } from './components/algoritmo';
import { almacenarResultado } from './components/localManager';


/**
 * Constante con los nombres de las 3 Pantallas.
 */
const titleTextNames = ["Calculadora", "Historial", "Ayuda"];


setupIonicReact();

/**
 * Definición raíz de la aplicación.
 */
const App: React.FC = () => {


  //Worker del algoritmo para evitar que se congele la pantalla React
  const [algoritmoWorker, setAlgoritmoWorker] = useState<Worker | null>(null);

  const [estadoResultadoAlgoritmo, setEstadoResultadoAlgoritmo] = useState<ResultadoAlgoritmo | null>(null)
  const [estadoResultadoAlgoritmoHistorial, setEstadoResultadoAlgoritmoHistorial] = useState<ResultadoAlgoritmo | null>(null)

  //Referencias para persistir los datos para generar progreso y tiempo restante.
  const referenciaPorcentajeYPerformanceInicial = useRef<[number, number] | null>(null);
  const referenciaPorcentajeYPerformanceActual = useRef<[number, number] | null>(null);

  const [estadoPorcentajeYPerformance, setEstadoPorcentajeYPerformance] = useState<string>('0% - Calculando tiempo estimado');


  // Estado de react para definir la Tab seleccionada.
  const [tabNumber, setTabNumber] = useState(0);


  // Estados Tab1
  const estadoBotonIniciarAlgoritmoEnabled = useState<boolean>(false);
  const estadoBotonDatosAvanzadosPresionado = useState<boolean>(false);


  const estadoDatosAlgoritmo = useState<DatosAlgoritmoEstadoReact>(
    {
      tma: '',
      pma: '',
      repeticiones: '' + datosAvanzadosAlgoritmoPorDefecto.repeticiones,
      compositores: '' + datosAvanzadosAlgoritmoPorDefecto.compositores,
      maxEvaluaciones: '' + datosAvanzadosAlgoritmoPorDefecto.maxEvaluaciones,
      memoria: '' + datosAvanzadosAlgoritmoPorDefecto.memoria,
      pruebas: '' + datosAvanzadosAlgoritmoPorDefecto.pruebas,
      fcla: '' + datosAvanzadosAlgoritmoPorDefecto.fcla,
      cfg: '' + datosAvanzadosAlgoritmoPorDefecto.cfg,
      ifg: '' + datosAvanzadosAlgoritmoPorDefecto.ifg
    }
  );

  const iniciarAlgoritmo = () => {

    setAlgoritmoWorker(new Worker(new URL("./components/algoritmo.ts", import.meta.url)));

  }

  const detenerAlgoritmo = () => {
    algoritmoWorker?.terminate();
    setAlgoritmoWorker(null);
    referenciaPorcentajeYPerformanceInicial.current = null;
    referenciaPorcentajeYPerformanceActual.current = null;
    setEstadoPorcentajeYPerformance('0% - Calculando tiempo estimado');

  }

  const generarStringPorcentajeYTiempo = (
    inicial: [number, number] | null,
    actual: [number, number] | null
  ): string => {
    if (
      inicial === null ||
      actual === null
    ) {
      return '0% - Calculando tiempo estimado';
    } else {
      const [porcentajeInicial, performanceInicial] = inicial;
      const [porcentajeActual, performanceActual] = actual;

      return `${porcentajeActual.toFixed(2)}% - ${generarStringTiempoRestante(porcentajeInicial, performanceInicial, porcentajeActual, performanceActual)}`;
    }
  }

  const generarStringTiempoRestante = (
    porcentajeInicial: number,
    performanceInicial: number,
    porcentajeActual: number,
    performanceActual: number
  ): string => {

    const diferenciaTiempos = performanceActual - performanceInicial;

    const porcentajeRestante = 100 - porcentajeActual;

    const tiempoRestanteMS = diferenciaTiempos * porcentajeRestante / porcentajeActual;

    const tiempoRestanteSeg = tiempoRestanteMS / 1000;

    const tiempoRestanteMin = tiempoRestanteSeg / 60;

    const tiempoRestanteHor = tiempoRestanteMin / 60;


    if (tiempoRestanteSeg < 60) {
      if (Math.floor(tiempoRestanteSeg) === 1) return `${tiempoRestanteSeg.toFixed(0)} segundo`;
      return `${tiempoRestanteSeg.toFixed(0)} segundos`;

    } else if (tiempoRestanteMin < 60) {
      if (Math.floor(tiempoRestanteMin) === 1) return `${tiempoRestanteMin.toFixed(0)} minuto`;
      return `${tiempoRestanteMin.toFixed(0)} minutos`;

    } else {
      if (Math.floor(tiempoRestanteHor) === 1) return `${tiempoRestanteHor.toFixed(0)} hora`;
      return `${tiempoRestanteHor.toFixed(0)} horas`;
    }

  }


  const cerrarVentanaResultadoCalculadora = () => {
    setEstadoResultadoAlgoritmo(null);
  }

  const abrirVentanaResultadoHistorial = (resultadoAlgoritmo: ResultadoAlgoritmo) => {
    setEstadoResultadoAlgoritmoHistorial(resultadoAlgoritmo);
  }

  const cerrarVentanaResultadoHistorial = () => {
    setEstadoResultadoAlgoritmoHistorial(null);
  }

  useEffect(() => {
    if (algoritmoWorker !== null) {
      const interval = setInterval(() => {
        setEstadoPorcentajeYPerformance(
          generarStringPorcentajeYTiempo(
            referenciaPorcentajeYPerformanceInicial.current,
            referenciaPorcentajeYPerformanceActual.current,)
        )
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [algoritmoWorker]);


  useEffect(() => {
    if (algoritmoWorker) {

      const datosBasicosAlgoritmo: DatosBasicosAlgoritmo = {
        tma: Number(estadoDatosAlgoritmo[0].tma),
        pma: Number(estadoDatosAlgoritmo[0].pma)
      }

      const datosAvanzadosAlgoritmo: DatosAvanzadosAlgoritmo = (estadoBotonDatosAvanzadosPresionado) ? {
        repeticiones: Number(estadoDatosAlgoritmo[0].repeticiones),
        compositores: Number(estadoDatosAlgoritmo[0].compositores),
        maxEvaluaciones: Number(estadoDatosAlgoritmo[0].maxEvaluaciones),
        memoria: Number(estadoDatosAlgoritmo[0].memoria),
        pruebas: Number(estadoDatosAlgoritmo[0].pruebas),
        fcla: Number(estadoDatosAlgoritmo[0].fcla),
        cfg: Number(estadoDatosAlgoritmo[0].cfg),
        ifg: Number(estadoDatosAlgoritmo[0].ifg)
      } : datosAvanzadosAlgoritmoPorDefecto;

      const datosAlgoritmo: DatosAlgoritmo = {
        ...datosBasicosAlgoritmo,
        ...datosAvanzadosAlgoritmo
      }

      const mensajeDeInicio: MensajeAlgoritmoArranque = {
        mensaje: 'iniciar',
        datosAlgoritmo
      }

      algoritmoWorker?.postMessage(mensajeDeInicio);
    }
  }, [algoritmoWorker]);

  useEffect(() => {
    if (algoritmoWorker) {
      algoritmoWorker.onmessage = (message: MessageEvent<MensajeAlgoritmo>) => {
        if (message.data.mensaje === 'progreso') {
          if (referenciaPorcentajeYPerformanceInicial.current === null) {
            const { porcentaje, performance } = message.data.progreso;
            referenciaPorcentajeYPerformanceInicial.current = [porcentaje, performance];
          } else {
            const { porcentaje, performance } = message.data.progreso;
            referenciaPorcentajeYPerformanceActual.current = [porcentaje, performance];
          }

        } else if (message.data.mensaje === 'resultado') {
          if (referenciaPorcentajeYPerformanceActual.current && referenciaPorcentajeYPerformanceInicial.current) {
            console.log('Tiempo de ejecución: ' + (referenciaPorcentajeYPerformanceActual.current?.[1] - referenciaPorcentajeYPerformanceInicial.current?.[1]) / 1000);
          }
          almacenarResultado(message.data.resultadoAlgoritmo);
          setEstadoResultadoAlgoritmo(message.data.resultadoAlgoritmo);
          detenerAlgoritmo();
        }

      }
    }

  }, [algoritmoWorker?.onmessage]);


  return (
    <Box style={{ display: "flex", justifyContent: 'center', backgroundColor: "#F7E2E3" }}>
      <Box style={{ height: "100vh", width: "100%", maxWidth: "820px", display: "flex", flexFlow: "column", flexDirection: "column" }}>
        <Box style={{ width: "100%" }}>
          <AppBar titleText={titleTextNames[tabNumber]} />
        </Box>

        <Box style={{ flex: 1, overflow: "auto", height: "100%", backgroundColor: "white", padding: "5px" }}>
          <Paper elevation={1} >

            {
              tabNumber === 0 ?
                <Tab1
                  estadoBotonIniciarAlgoritmoEnabled={estadoBotonIniciarAlgoritmoEnabled}
                  estadoBotonDatosAvanzadosPresionado={estadoBotonDatosAvanzadosPresionado}
                  estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                  iniciarAlgoritmo={iniciarAlgoritmo}
                  detenerAlgoritmo={detenerAlgoritmo}
                  estadoDelAlgoritmo={(algoritmoWorker) ? 'enEjecucion' : 'sinEjecutar'}
                  estadoPorcentajeYPerformance={estadoPorcentajeYPerformance}
                  estadoResultadoAlgoritmo={estadoResultadoAlgoritmo}
                  cerrarVentanaResultadoCalculadora={cerrarVentanaResultadoCalculadora}
                />
                :
                tabNumber === 1 ?
                  <Tab2
                    estadoResultadoAlgoritmo={estadoResultadoAlgoritmoHistorial}
                    abrirVentanaResultadoHistorial={abrirVentanaResultadoHistorial}
                    cerrarVentanaResultadoHistorial={cerrarVentanaResultadoHistorial}
                  />
                  :
                  <Tab3 />
            }
          </Paper>

        </Box>
        <Box style={{ width: "100%", }}>
          <TabsManager
            tabNumber={tabNumber}
            setTabNumber={setTabNumber}
          />
        </Box>

      </Box>
    </Box>

  );
}
export default App;
