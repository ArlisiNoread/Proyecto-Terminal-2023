import Box from '@mui/material/Box';
import { ResultadoAlgoritmo } from './auxiliaresDelAlgoritmo';
import Historial from './Historial';
import VisorRecomendaciones from './VisorRecomendaciones';


const Tab2: React.FC<
    {
        estadoResultadoAlgoritmo: ResultadoAlgoritmo | null,
        abrirVentanaResultadoHistorial: Function,
        cerrarVentanaResultadoHistorial: Function
    }
> = (
    {
        estadoResultadoAlgoritmo,
        abrirVentanaResultadoHistorial,
        cerrarVentanaResultadoHistorial
    }
) => {

        return (
            <Box sx={{ margin: '10px' }}>
                <Historial
                    abrirVentanaResultadoHistorial={abrirVentanaResultadoHistorial}
                />
                <VisorRecomendaciones
                    resultadoAlgoritmo={estadoResultadoAlgoritmo}
                    cerrarVentanaResultado={cerrarVentanaResultadoHistorial}
                />
            </Box>
        );
    }

export default Tab2;