import React, {useContext, Fragment} from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';

import Tarea from './Tarea';

const ListadoTareas = () => {

    //OBTENER EL STATE DEL FORMULARIO
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    //SI NO HAY PROYECTO SELECCIONADO
    if(!proyecto) return <h2>Selecciona un poryecto</h2>;

    //ARRAY DESTRUCTURING PARA EXTRAER EL PROYECTO
    const [proyectoActual] = proyecto;

    const tareasProyecto = [
        {nombre : 'Elegir plataforma', estado : true},
        {nombre : 'Elegir Dominio', estado : false},
        {nombre : 'Elegit productos', estado : true},
        {nombre : 'Elegir clientes', estado : true}
    ]

    //ELIMINAR UN PROYECTO
    const handleClickEliminar = () => {
        eliminarProyecto(proyectoActual.id);
    }

    return (  
        <Fragment>
            <h2>Proyecto : {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    : tareasProyecto.map(tarea => (
                        <Tarea
                            tarea={tarea}
                        />
                    ))
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