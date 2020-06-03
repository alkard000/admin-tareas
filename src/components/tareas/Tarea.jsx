import React, {useContext} from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //EXTRAER SI UN PROYECTO ESTA ACTIVO
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //CREAR EL CONTEXT DE TAREAS
    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, cambiarEstado, guardarTareaActual} = tareasContext;

    //EXTRAER EL PRECTO
    const [proyectoActual] = proyecto;

    //FUNCION QUE SE EJECUTA CUANDO EL USUSRIO PRESIONA EL BOTON DE ELIMINAR
    const handleClick = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id)
    }

    //FUNCION UQE MODIFICA EL ESTADO DE LAS TAREAS
    const cambiarEstadoTarea = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        cambiarEstado(tarea);
    }

    //AGREGA UNA TAREA ACTUAL CUANDO EL USUARIO DESEA EDITARLA
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (  
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado 
                ? 
                    (
                        <button
                            type='button'
                            className='completo'
                            onClick={() => cambiarEstadoTarea(tarea)}
                        >
                            Completo
                        </button>
                    )
                :
                    (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={() => cambiarEstadoTarea(tarea)}
                        >
                            Incompleto
                        </button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => handleClick(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
    );
}
 
export default Tarea;