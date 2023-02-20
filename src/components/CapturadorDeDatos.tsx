import { Button, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { rangosDeDatosAlgoritmo, datosAvanzadosAlgoritmoPorDefecto, NombreDatoAlgoritmo, DatosAlgoritmoEstadoReact } from './auxiliaresDelAlgoritmo';



/**
 * Modulo
 * 
 * Este componente renderiza la vista para ingresar los datos
 * 
 */
const CapturadorDeDatos: React.FC<
    {
        estadoBotonIniciarAlgoritmoEnabled: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        estadoBotonDatosAvanzadosPresionado: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        estadoDatosAlgoritmo: [DatosAlgoritmoEstadoReact, React.Dispatch<React.SetStateAction<DatosAlgoritmoEstadoReact>>],
        iniciarAlgoritmo: Function,
        detenerAlgoritmo: Function,
        estadoDelAlgoritmo: 'enEjecucion' | 'sinEjecutar',
        estadoPorcentajeYPerformance: string

    }
> = (
    {
        estadoBotonIniciarAlgoritmoEnabled,
        estadoBotonDatosAvanzadosPresionado,
        estadoDatosAlgoritmo,
        iniciarAlgoritmo,
        detenerAlgoritmo,
        estadoDelAlgoritmo,
        estadoPorcentajeYPerformance
    }
) => {

        return (
            <Box>
                <Grid container >
                    <CampoParaDatoAlgoritmo
                        tipoDato='basico'
                        nombre={'tma'}
                        estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                        estadoDelAlgoritmo={estadoDelAlgoritmo}
                    />
                    <CampoParaDatoAlgoritmo
                        tipoDato='basico'
                        nombre='pma'
                        estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                        estadoDelAlgoritmo={estadoDelAlgoritmo}
                    />
                    <GridBotonIniciarAlgoritmo
                        habilitador={estadoBotonIniciarAlgoritmoEnabled}
                        datosBasicos={[estadoDatosAlgoritmo[0].tma, estadoDatosAlgoritmo[0].pma]}
                        iniciarAlgoritmo={iniciarAlgoritmo}
                        detenerAlgoritmo={detenerAlgoritmo}
                        estadoDelAlgoritmo={estadoDelAlgoritmo}
                        estadoPorcentajeYPerformance={estadoPorcentajeYPerformance}
                    />
                    <GridBotonMostrarParametrosAvanzados
                        tipoDeBoton='mostrarDatosAvanzados'
                        habilitador={estadoBotonDatosAvanzadosPresionado}
                        estadoDelAlgoritmo={estadoDelAlgoritmo}
                    />
                </Grid>
                {
                    estadoBotonDatosAvanzadosPresionado[0] ?
                        <Grid container>
                            <CampoParaDatoAlgoritmo
                                tipoDato='avanzado'
                                nombre='repeticiones'
                                estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                                estadoDelAlgoritmo={estadoDelAlgoritmo}
                            />
                            <CampoParaDatoAlgoritmo
                                tipoDato='avanzado'
                                nombre='compositores'
                                estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                                estadoDelAlgoritmo={estadoDelAlgoritmo}
                            />
                            <CampoParaDatoAlgoritmo
                                tipoDato='avanzado'
                                nombre='maxEvaluaciones'
                                estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                                estadoDelAlgoritmo={estadoDelAlgoritmo}
                            />
                            <CampoParaDatoAlgoritmo
                                tipoDato='avanzado'
                                nombre='memoria'
                                estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                                estadoDelAlgoritmo={estadoDelAlgoritmo}
                            />
                            <CampoParaDatoAlgoritmo
                                tipoDato='avanzado'
                                nombre='pruebas'
                                estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                                estadoDelAlgoritmo={estadoDelAlgoritmo}
                            />
                            <CampoParaDatoAlgoritmo
                                tipoDato='avanzado'
                                nombre='fcla'
                                estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                                estadoDelAlgoritmo={estadoDelAlgoritmo}
                            />
                            <CampoParaDatoAlgoritmo
                                tipoDato='avanzado'
                                nombre='cfg'
                                estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                                estadoDelAlgoritmo={estadoDelAlgoritmo}
                            />
                            <CampoParaDatoAlgoritmo
                                tipoDato='avanzado'
                                nombre='ifg'
                                estadoDatosAlgoritmo={estadoDatosAlgoritmo}
                                estadoDelAlgoritmo={estadoDelAlgoritmo}
                            />
                        </Grid>
                        : ''
                }
            </Box>

        );
    };

export default CapturadorDeDatos;



const CampoParaDatoAlgoritmo: React.FC<
    {
        tipoDato: 'basico' | 'avanzado',
        nombre: NombreDatoAlgoritmo,
        estadoDatosAlgoritmo: [DatosAlgoritmoEstadoReact, React.Dispatch<React.SetStateAction<DatosAlgoritmoEstadoReact>>],
        estadoDelAlgoritmo: 'enEjecucion' | 'sinEjecutar'

    }
> = (
    {
        tipoDato,
        nombre,
        estadoDatosAlgoritmo,
        estadoDelAlgoritmo
    }
) => {

        const [refEstadoDatosAlgoritmo, setEstadoDatosAlgoritmo] = estadoDatosAlgoritmo;

        const valorDato = refEstadoDatosAlgoritmo[nombre];

        const valorarYActualizarCampo = (event: React.ChangeEvent<HTMLInputElement>) => {
            let valorNuevo = event.target.value;
            const editableRef = { ...refEstadoDatosAlgoritmo };
            editableRef[nombre] = valorNuevo;
            setEstadoDatosAlgoritmo(editableRef);


        }


        const onBlurSetDefault = () => {
            if (nombre !== 'tma' && nombre !== 'pma') {
                const editableRef = { ...refEstadoDatosAlgoritmo };
                const dominioDato = rangosDeDatosAlgoritmo[nombre][2];

                if (refEstadoDatosAlgoritmo[nombre] === '') {
                    editableRef[nombre] = '' + datosAvanzadosAlgoritmoPorDefecto[nombre];
                    setEstadoDatosAlgoritmo(editableRef);
                } else {
                    let tempValue: number = Number(estadoDatosAlgoritmo[0][nombre]);
                    if (tempValue < rangosDeDatosAlgoritmo[nombre][0]) tempValue = rangosDeDatosAlgoritmo[nombre][0];
                    if (tempValue > rangosDeDatosAlgoritmo[nombre][1]) tempValue = rangosDeDatosAlgoritmo[nombre][1];
                    if (dominioDato === 'entero') {
                        tempValue = Math.round(tempValue);
                    }

                    editableRef[nombre] = '' + tempValue;

                    setEstadoDatosAlgoritmo(editableRef);
                }
            } else {
                if (refEstadoDatosAlgoritmo[nombre] === '') {
                    const editableRef = { ...refEstadoDatosAlgoritmo };
                    editableRef[nombre] = '';
                    setEstadoDatosAlgoritmo(editableRef);
                } else {
                    const editableRef = { ...refEstadoDatosAlgoritmo };
                    const dominioDato = rangosDeDatosAlgoritmo[nombre][2];
                    let tempValue: number = Number(estadoDatosAlgoritmo[0][nombre]);
                    if (tempValue < rangosDeDatosAlgoritmo[nombre][0]) tempValue = rangosDeDatosAlgoritmo[nombre][0];
                    if (tempValue > rangosDeDatosAlgoritmo[nombre][1]) tempValue = rangosDeDatosAlgoritmo[nombre][1];
                    editableRef[nombre] = '' + tempValue;

                    setEstadoDatosAlgoritmo(editableRef);
                }
            }
        }

        return (
            <Grid item xs={6} style={
                {
                    textAlign: "center",
                    margin: ' 4px 0px 4px 0px'
                }}
            >
                <TextField
                    sx={
                        {
                            width: { xs: 140 }
                        }
                    }
                    disabled={estadoDelAlgoritmo === 'enEjecucion'}
                    label={nombre.toUpperCase()}
                    value={valorDato}
                    variant={tipoDato === 'basico' ? 'outlined' : 'standard'}
                    helperText={`Rango: [${rangosDeDatosAlgoritmo[nombre][0]}, ${rangosDeDatosAlgoritmo[nombre][1]}]`}
                    onChange={valorarYActualizarCampo}
                    onBlur={onBlurSetDefault}
                    type={'number'}
                    inputProps={{
                        step: (nombre === 'fcla' || nombre === 'cfg' || nombre === 'ifg') ? 0.001 : 1,
                    }}
                />
            </Grid >
        );
    };



const GridBotonIniciarAlgoritmo: React.FC<
    {
        habilitador: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        datosBasicos: [string, string],
        iniciarAlgoritmo: Function,
        detenerAlgoritmo: Function,
        estadoDelAlgoritmo: 'enEjecucion' | 'sinEjecutar',
        estadoPorcentajeYPerformance: string
    }
> = (
    {
        habilitador,
        datosBasicos,
        iniciarAlgoritmo,
        detenerAlgoritmo,
        estadoDelAlgoritmo,
        estadoPorcentajeYPerformance
    }
) => {
        const [datoTMA, datoPMA] = datosBasicos;

        const readyToStart: boolean = (datoTMA !== '' && datoPMA !== '');

        const isButtonPressed: boolean = habilitador[0];

        const buttonActionOfBeingPressed = () => {
            habilitador[1](!isButtonPressed);
        }


        const onClickButton = () => {
            if (estadoDelAlgoritmo === 'enEjecucion') {
                detenerAlgoritmo()
            } else {
                iniciarAlgoritmo();
            }
        }

        return (
            <Grid item xs={12} style={
                {
                    textAlign: "center",
                    margin: '5px 0px 5px 0px'
                }
            }>
                <Button
                    variant={readyToStart ? 'contained' : 'outlined'}
                    disabled={!readyToStart}
                    onClick={onClickButton}
                    style={
                        {
                            color: 'black',
                            backgroundColor:
                                (readyToStart && estadoDelAlgoritmo === 'enEjecucion') ? '#B0BBE8' :
                                    (readyToStart) ? '#A3CEB1' : '#FD8A8A'
                        }
                    }
                >
                    {
                        (readyToStart && estadoDelAlgoritmo === 'enEjecucion') ? estadoPorcentajeYPerformance :
                            (readyToStart && estadoDelAlgoritmo === 'sinEjecutar') ? 'Iniciar Algoritmo' : 'Ingresar Parámetros'
                    }
                </Button>
            </Grid >
        );
    }


const GridBotonMostrarParametrosAvanzados: React.FC<
    {
        tipoDeBoton: 'iniciarAlgoritmo' | 'mostrarDatosAvanzados',
        habilitador: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        estadoDelAlgoritmo: 'enEjecucion' | 'sinEjecutar'
    }
> = (
    {
        tipoDeBoton,
        habilitador,
        estadoDelAlgoritmo
    }
) => {

        const isButtonPressed: boolean = habilitador[0];

        const buttonActionOfBeingPressed = () => {
            habilitador[1](!isButtonPressed);
        }

        return (
            <Grid item xs={12} style={
                {
                    textAlign: "center",
                    margin: '5px 0px 5px 0px'
                }
            }>
                <Button
                    disabled={estadoDelAlgoritmo === 'enEjecucion'}
                    variant={isButtonPressed ? 'contained' : 'outlined'}
                    onClick={buttonActionOfBeingPressed}
                    sx={
                        {
                            fontSize: (tipoDeBoton === 'mostrarDatosAvanzados') ? '10px' : ''
                        }
                    }
                    style={
                        {
                            backgroundColor: (tipoDeBoton === 'iniciarAlgoritmo') ? '#FD8A8A' : ''
                        }
                    }
                >
                    {
                        tipoDeBoton === 'iniciarAlgoritmo' ? 'Ingresar Parámetros' :
                            tipoDeBoton === 'mostrarDatosAvanzados' ? 'Mostrar Parámetros Avanzados' : ''
                    }
                </Button>
            </Grid >
        );
    }



