import { Divider } from '@mui/material';
import Box from '@mui/material/Box';


const Ayuda: React.FC<{}> = ({ }) => {

    return (
        <Box style={
            {
                textAlign: "center",
                margin: '5px 0px 5px 0px'
            }
        }
        >
            <h2>
                Aplicación de Proyecto Terminal
            </h2>
            <h4>"Diseño e implementación de aplicación para visualización de resultados de investigación relacionada al diseño arquitectónico con base en estrategias sustentables"</h4>
            <h4>
                Desarrollador: <br />
                Roberto Manuel Piña Sevilla<br />
                Estudiante de Ingeniería en Computación<br />
                UAM - Azcapotzalco<br />
                roberto.m.pina.s@gmail.com
            </h4>
            <h4>
                Asesores:<br />
                <br />
                Dr. Luis Ángel Meza Zárate<br />
                Profesor Asociado<br />
                Depto. de Procesos y Técnicas de Realización CYAD<br />
                lamz@azc.uam.mx<br />
                <br />
                Dr. Roman Anselmo Mora Gutiérrez<br />
                Profesor Asociado<br />
                Depto. de Sistemas<br />
                ing.romanmora@gmail.com
            </h4>

            <Divider />

            <Box textAlign={'left'} padding={'20px'}>
                <Box>
                    <p>
                        El objetivo principal del presente proyecto de integración es rediseñar, optimizar y
                        proponer una aplicación móvil en relación con siguiente investigación “Bienestar y confort
                        de las personas: Metodología de visualización para el diseño arquitectónico basado en
                        estrategias sustentables”, donde se resolvió un problema de algoritmo de composición
                        musical.
                    </p>
                </Box>
                <h3>Instrucciones de uso</h3>
                <Box marginLeft={'5px'}>
                    <h4>Calculadora</h4>
                    <ul>
                        <li>
                            Para iniciar el algoritmo es necesario agregar los valores TMA y PMA
                            (Temperatura Media Anual y Precipitación Medial Anual) de la zona a analizar.<br />
                            Estos datos se pueden obtener con precisión de la página oficial de <a href='https://smn.conagua.gob.mx/es/climatologia/informacion-climatologica/normales-climatologicas-por-estado'>Conagua</a>.

                        </li>
                        <li>Si los datos fueron agregados correctamente, el botón central permitirá iniciar el algoritmo.</li>
                        <li>
                            Presionando el botón "Mostrar Parámetros Avanzados" permitirá al usuario modificar los parámetros internos del algoritmo MMC.<br />
                            Esto no se recomienda pues puede afectar el rendimiento del algoritmo y los resultados del mismo, se deja a consideración del usuario.<br />
                            Presionar de nuevo el botón deshabilitará la configuración de parámetros del algoritmo, el algoritmo se ejecutaría con los parámetros por defecto.
                        </li>
                        <li>
                            Los parámetros están protegidos por un rango de valores permitidos, agregar un valor que exceda el rango lo regresará a su valor permitido más próximo.<br />
                            Para los parámetros avanzados dejar la casilla vacía no es válido, se asignará automáticamente el valor por defecto si sucede el caso.
                        </li>
                        <li>
                            Al iniciar la ejecución del algoritmo volver a presionar el botón (ahora con un texto de porcentaje y tiempo restante) detendrá el Algoritmo por completo.
                        </li>
                        <li>
                            Al finalizar la ejecución correcta del algoritmo se mostrará una pantalla flotante con las recomendaciones arquitectónicas.<br />
                            La ventana se puede cerrar presionando el botón con ícono de 'x' en la parte superior derecha de la ventana.<br />
                            Al cerrar la ventana flotante la aplicación queda lista para realizar otra posible ejecución del algoritmo.
                        </li>
                    </ul>
                    <h4>Historial</h4>
                    <ul>
                        <li>
                            Toda ejecución del algoritmo queda almacenada por la aplicación para poder revisarla sin tener que volver a ejecutar el algoritmo.
                        </li>
                        <li>
                            Esta pantalla muestra el historial de ejecuciones del algoritmo.
                        </li>
                        <li>
                            Presionar sobre cualquier resultado mostrará una pantalla flotante con las recomendaciones arquitectónicas de dicha ejecución del algoritmo.<br />
                            La ventana se puede cerrar presionando el botón con ícono de 'x' en la parte superior derecha de la ventana.<br />
                            Al cerrar la ventana flotante la aplicación muestra de nuevo los resultados almacenados.
                        </li>
                        <li>
                            Presionar el botón con ícono de 'x' del lado derecho del resultado almacenado, en la pantalla de historial, eliminará el resultado.
                        </li>
                    </ul>


                </Box>
            </Box>

        </Box >
    );
}

export default Ayuda;