import { Button, Card, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { ResultadoAlgoritmo } from './auxiliaresDelAlgoritmo';
import { eliminarResultado, obtenerVectorResultados } from './localManager';
import dateFormat, { i18n } from "dateformat";
import CloseIcon from '@mui/icons-material/Close';

i18n.dayNames = [
    "Dom",
    "Lun",
    "Mar",
    "Mie",
    "Jue",
    "Vie",
    "Sab",
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];

i18n.monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];


const Historial: React.FC<
    {
        abrirVentanaResultadoHistorial: Function
    }
> = (
    { abrirVentanaResultadoHistorial }
) => {

        const [estadoArrayResultados, setEstadoDatosAlgoritmo] = useState<ResultadoAlgoritmo[] | null>(null);

        const eliminarResultadoHistorial = (index: number) => {
            eliminarResultado(index);
            actualizarResultadosEnVista();
        }

        const actualizarResultadosEnVista = () => {
            const arrayResultados: ResultadoAlgoritmo[] = obtenerVectorResultados();
            if (arrayResultados !== estadoArrayResultados) {
                setEstadoDatosAlgoritmo(arrayResultados);
            }
        }

        useEffect(() => {
            actualizarResultadosEnVista();
        }, []);

        return (
            <Box sx={
                {
                    textAlign: 'center',
                    justifyContent: 'center'
                }
            }>
                {
                    estadoArrayResultados ?
                        estadoArrayResultados.slice(0).reverse().map((value: ResultadoAlgoritmo, index) =>
                            <CajaElemento
                                resultadoAlgoritmo={value}
                                indexResultado={(estadoArrayResultados.length - 1) - index}
                                abrirVentanaResultadoHistorial={abrirVentanaResultadoHistorial}
                                eliminarResultadoHistorial={eliminarResultadoHistorial}
                            />
                        )
                        : ''
                }

            </Box>
        );
    }
export default Historial;

const CajaElemento: React.FC<
    {
        resultadoAlgoritmo: ResultadoAlgoritmo,
        indexResultado: number,
        abrirVentanaResultadoHistorial: Function,
        eliminarResultadoHistorial: Function
    }
> = (
    {
        resultadoAlgoritmo,
        indexResultado,
        abrirVentanaResultadoHistorial,
        eliminarResultadoHistorial
    }
) => {
        return (
            <Card style={{ padding: '0px', margin: '10px auto 10px auto ', textAlign: 'center', justifyItems: 'center', justifyContent: 'center' }}
                sx={{ width: { xs: '95%', sm: '90%', md: '80%' } }}
            >

                <Grid container>
                    <Grid item xs={10}>
                        <Button style={{ margin: '0px', width: '100%' }}
                            onClick={() => { abrirVentanaResultadoHistorial(resultadoAlgoritmo) }}
                        >
                            <Grid container>
                                <Grid item xs={6}>
                                    {`${dateFormat(resultadoAlgoritmo.fecha, "dddd, mmmm dS, yyyy, h:MM:ss TT")}`}
                                </Grid>
                                <Grid item xs={6}>
                                    {`${resultadoAlgoritmo.bioclima}`}
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={2}>

                        <CloseIcon
                            style={
                                {
                                    fontSize: '20',
                                    margin: '10px'
                                }
                            }
                            onClick={() => { eliminarResultadoHistorial(indexResultado) }}
                        />
                    </Grid>

                </Grid>
            </Card>


        );
    }