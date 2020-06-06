import React, {useContext, Fragment} from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Tarea from './Tarea';

const ListadoTareas = () => {

    //OBTENER EL STATE DEL FORMULARIO
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    //OBTENER EL STATE DE TAREAS
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    //SI NO HAY PROYECTO SELECCIONADO
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //ARRAY DESTRUCTURING PARA EXTRAER EL PROYECTO
    const [proyectoActual] = proyecto;


    //ELIMINAR UN PROYECTO
    const handleClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return (  
        <Fragment>
            <h2>Proyecto : {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames='tarea'
                            >
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type='button'
                className='btn btn-eliminar'
                onClick={handleClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTareas;