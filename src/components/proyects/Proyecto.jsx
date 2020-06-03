import React, {useContext} from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {

    //OBTENER EL STATE DEL FORMULARIO
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    //CREAR EL CONTEXT DE TAREAS
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    //FUNCION PARA AGREGAR EL PROYECTO ACTUAL
    const seleccionarProyecto = id => {
        proyectoActual(id); //FIJAR UN PROYECTO ACTUAL
        obtenerTareas(id); //FILTRAR LAS TAREAS AL CLIKEAR
    }

    return (  
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => seleccionarProyecto(proyecto.id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}
 
export default Proyecto;