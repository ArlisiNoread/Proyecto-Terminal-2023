import Box from '@mui/material/Box';
import { DatosAlgoritmoEstadoReact, ResultadoAlgoritmo } from './auxiliaresDelAlgoritmo';
import CapturadorDeDatos from './CapturadorDeDatos';
import VisorRecomendaciones from './VisorRecomendaciones';


const Tab1: React.FC<
    {
        estadoBotonIniciarAlgoritmoEnabled: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        estadoBotonDatosAvanzadosPresionado: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        estadoDatosAlgoritmo: [DatosAlgoritmoEstadoReact, React.Dispatch<React.SetStateAction<DatosAlgoritmoEstadoReact>>]
        iniciarAlgoritmo: Function,
        detenerAlgoritmo: Function,
        estadoDelAlgoritmo: 'enEjecucion' | 'sinEjecutar',
        estadoPorcentajeYPerformance: string,
        estadoResultadoAlgoritmo: ResultadoAlgoritmo | null,
        cerrarVentanaResultadoCalculadora: Function
    }
> = (
    {
        estadoBotonIniciarAlgoritmoEnabled,
        estadoBotonDatosAvanzadosPresionado,
        estadoDatosAlgoritmo,
        iniciarAlgoritmo,
        detenerAlgoritmo,
        estadoDelAlgoritmo,
        estadoPorcentajeYPerformance,
        estadoResultadoAlgoritmo,
        cerrarVentanaResultadoCalculadora
    }
) => {
        return (
            <Box sx={{ margin: '10px' }}>
                <CapturadorDeDatos
                    estadoBotonIniciarAlgoritmoEnabled={estadoBotonIniciarAlgoritmoEnabled}
                    estadoBotonDatosAvanzadosPresionado={estadoBotonDatosAvanzadosPresionado}
                    estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                    iniciarAlgoritmo={iniciarAlgoritmo}
                    detenerAlgoritmo={detenerAlgoritmo}
                    estadoDelAlgoritmo={estadoDelAlgoritmo}
                    estadoPorcentajeYPerformance={estadoPorcentajeYPerformance}
                />
                <VisorRecomendaciones
                    resultadoAlgoritmo={estadoResultadoAlgoritmo}
                    cerrarVentanaResultado={cerrarVentanaResultadoCalculadora}
                />
            </Box>

        );
    }

export default Tab1;





