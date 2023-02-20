import { IonImg } from '@ionic/react';
import { Box, Grid, Paper } from "@mui/material";
import { BioclimasAlgoritmo, ResultadoAlgoritmo } from "./auxiliaresDelAlgoritmo";
import CloseIcon from '@mui/icons-material/Close';
import imgSemifrioSeco from './VisorRecomendacionesImagenes/imgSemifrioSeco.png';
import imgSemifrio from './VisorRecomendacionesImagenes/imgSemifrio.png';
import imgSemiFrioHumedo from './VisorRecomendacionesImagenes/imgSemifrioHumedo.png';
import imgTempladoSeco from './VisorRecomendacionesImagenes/imgTempladoSeco.png';
import imgTemplado from './VisorRecomendacionesImagenes/imgTemplado.png';
import imgTempladoHumedo from './VisorRecomendacionesImagenes/imgTempladoHumedo.png';
import imgCalidoSeco from './VisorRecomendacionesImagenes/imgCalidoSeco.png';
import imgCalidoHumedo from './VisorRecomendacionesImagenes/imgCalidoHumedo.png';
import imgCalidoSemiHumedo from './VisorRecomendacionesImagenes/imgCalidoSemiHumedo.png';

const VisorRecomendaciones: React.FC<
    {
        resultadoAlgoritmo: ResultadoAlgoritmo | null,
        cerrarVentanaResultado: Function
    }
> = (
    {
        resultadoAlgoritmo,
        cerrarVentanaResultado
    }
) => {
        const imagenDeBioclima = (bioclima: BioclimasAlgoritmo): string => {
            if (bioclima === "semifrío seco") {
                return imgSemifrioSeco;
            } else if (bioclima === "semifrío") {
                return imgSemifrio;
            } else if (bioclima === "semifrío húmedo") {
                return imgSemiFrioHumedo;
            } else if (bioclima === "templado seco") {
                return imgTempladoSeco;
            } else if (bioclima === "templado") {
                return imgTemplado;
            } else if (bioclima === "templado húmedo") {
                return imgTempladoHumedo;
            } else if (bioclima === "cálido seco") {
                return imgCalidoSeco;
            } else if (bioclima === "cálido semihúmedo") {
                return imgCalidoSemiHumedo;
            } else {
                return imgCalidoHumedo;
            }
        }

        return (
            <Paper
                elevation={3}
                style={
                    {
                        display: (resultadoAlgoritmo) ? '' : "none",
                        zIndex: 10,
                        position: "absolute",
                        top: '60px',
                        height: '78%',
                        left: 0,
                        right: 0,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        overflow: 'scroll'
                    }
                }
                sx={
                    {
                        width: {
                            xs: '95%',
                            sm: '90%',
                            md: '60%',
                            lg: '50%',
                            xl: '40%',
                        }

                    }
                }
            >
                {
                    (resultadoAlgoritmo) ?
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container style={
                                    {
                                        backgroundColor: 'black'
                                    }
                                }>
                                    <Grid item xs={10}
                                        textAlign={'left'}
                                    >
                                        <p style={
                                            {
                                                color: 'white',
                                                marginLeft: '20px'
                                            }
                                        }>{resultadoAlgoritmo.bioclima.toUpperCase()}</p>
                                    </Grid>
                                    <Grid
                                        item xs={2}
                                        textAlign={'right'}
                                    >
                                        <CloseIcon
                                            style={
                                                {
                                                    color: 'white',
                                                    fontSize: '30',
                                                    margin: '10px'
                                                }
                                            }
                                            onClick={() => { cerrarVentanaResultado() }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <IonImg
                                    style={{ margin: '20px' }}
                                    src={imagenDeBioclima(resultadoAlgoritmo.bioclima)}
                                ></IonImg>
                            </Grid>

                            <Grid item xs={12} style={{ margin: '0 20px 0 20px' }}>
                                <h3>Materiales Para Muros</h3>
                                {
                                    (resultadoAlgoritmo.recomendaciones.densidadMuros === 'alta') ?
                                        <Box>
                                            <h4>Alta (Materiales densos y masivos)</h4>
                                            <p>
                                                Ejemplo: poliestireno expandido, poliestireno extruido, lana mineral,
                                                lana de roca, lana de vidrio, poliuretano, corcho, celulosa, lana de oveja, arlita, poliestireno,
                                                minerales vegetales como perlita, vermiculita, adobe, fibra de vidrio, cob y pajereque, arcilla expandida, tapia, algodón, perlón, paja, madera,
                                                muros gruesos, piedra, granito.
                                            </p>
                                        </Box>
                                        :
                                        <Box>
                                            <h4>Baja (Materiales ligeros de poca densidad y baja conductividad)</h4>
                                            <p>
                                                Ejemplo: bambú, lana, arcilla ligera, hueso, tabique rojo recocido, tabique rojo hueco y estriado,
                                                block ligero, ladrillo, paja, caña, madera, guadua, cañabrava, block perforado.
                                            </p>

                                        </Box>
                                }

                            </Grid>
                            <Grid item xs={12} style={{ margin: '0 20px 0 20px' }}>
                                <h3>Materiales Para Techos</h3>
                                {
                                    (resultadoAlgoritmo.recomendaciones.densidadTechos === 'alta') ?
                                        <Box>
                                            <h4>Alta: Materiales densos y masivos.</h4>
                                            <p>
                                                Ejemplo: losas de concreto pero con aislantes como el poliestireno expandido, poliestireno extruido,
                                                lana mineral, lana de roca, lana de vidrio, poliuretano, corcho, celulosa, lana de oveja, arlita, lámina con poliestireno,
                                                perlita, vermiculita, adobe, fibra de vidrio, teja de barro, arcilla expandida, tapia, algodón,
                                                perlón, paja, madera, plafón falso, piedra, granito.
                                            </p>
                                        </Box>
                                        :
                                        <Box>
                                            <h4>Baja: Materiales ligeros de poca densidad y baja conductividad.</h4>
                                            <p>
                                                Ejemplo: bambú, lana, arcilla ligera, hueso, losas de tabique rojo recocido o vigueta y bovedilla, hojas de paja
                                                palma, caña, madera, guadua, cañabrava, block perforado.
                                            </p>

                                        </Box>
                                }
                            </Grid>

                            <Grid item xs={12} style={{ margin: '0 20px 0 20px' }}>
                                <h3>Altura Del Espacio</h3>
                                {
                                    (resultadoAlgoritmo.recomendaciones.altura === 'alta') ?
                                        <Box>
                                            <h4>Alto: 2.70m mínimo.</h4>

                                        </Box>
                                        :
                                        <Box>
                                            <h4>Bajo: 2.30m aproximadamente.</h4>

                                        </Box>
                                }
                            </Grid>
                            <Grid item xs={12} style={{ margin: '0 20px 0 20px' }}>
                                <h3>Color En Los Acabados</h3>
                                {
                                    (resultadoAlgoritmo.recomendaciones.acabado === 'claro') ?
                                        <Box>
                                            <h4>Claros: Del 60% al 80% de reflectancia en cualquier tonalidad. Considerar tonos blancos para plafones.</h4>

                                        </Box>
                                        :
                                        <Box>
                                            <h4>Oscuros: Igual o menor a 30% de reflectancia en cualquier tonalidad.</h4>
                                        </Box>
                                }
                            </Grid>

                            <Grid item xs={12} style={{ margin: '0 20px 0 20px' }}>
                                <h3>Sistema De Ventilación Natural</h3>
                                {
                                    (resultadoAlgoritmo.recomendaciones.ventilacion === 'unilateral') ?
                                        <Box>
                                            <h4>Unilateral: Un único acceso y salida del viento.</h4>

                                        </Box>
                                        :
                                        <Box>
                                            <h4>Cruzada: El viento entra y sale por vanos distintos.</h4>
                                        </Box>
                                }
                            </Grid>

                            <Grid item xs={12} style={{ margin: '0 20px 0 20px' }}>
                                <h3>Transmitancia Del Cristal</h3>
                                {
                                    (resultadoAlgoritmo.recomendaciones.transmitanciaDelCristal === 'alta') ?
                                        <Box>
                                            <h4>Alta: Cristal sencillo claro de 6mm.</h4>

                                        </Box>
                                        :
                                        <Box>
                                            <h4>Baja: Sistemas de doble cristal.</h4>
                                            <p>Se puede apoyar de cristales filtrasol, reflectasol o cualquier otra tecnología solar.</p>
                                        </Box>
                                }
                            </Grid>
                        </Grid>
                        : ''
                }


            </Paper >
        );
    }

export default VisorRecomendaciones;