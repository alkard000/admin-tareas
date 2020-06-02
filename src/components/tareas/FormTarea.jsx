import React, {useContext} from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';

const FormTarea = () => {

    //EXTRAER SI UN PROYECTO ESTA ACTIVO
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //SI NO HAY PROYECTO SELECCIONADO
    if(!proyecto) return null

    //ARRAY DESTRUCTURING PARA EXTRAER EL PROYECTO
    const [proyectoActual] = proyecto;

    return (  
        <div className="formulario">
            <form
            
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className='input-text'
                        placeholder='Nombre Tarea'
                        name='nombre'
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className='btn btn-primario btn-submit btn-block'
                        value='Agregar Tarea'
                    />
                </div>    
            </form>
        </div>
    );
}
 
export default FormTarea