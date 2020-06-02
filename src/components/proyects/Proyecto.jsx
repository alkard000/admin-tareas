import React, {useContext} from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';

const Proyecto = ({proyecto}) => {

    //OBTENER EL STATE DEL FORMULARIO
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    return (  
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => proyectoActual(proyecto.id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}
 
export default Proyecto;