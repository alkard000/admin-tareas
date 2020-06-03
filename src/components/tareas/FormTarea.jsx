import React, {useContext, useState, useEffect} from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //EXTRAER SI UN PROYECTO ESTA ACTIVO
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //ONTEXT DE TAREAS
    //CREAR EL CONTEXT DE TAREAS
    const tareasContext = useContext(tareaContext);
    const {
        tareaseleccionada, 
        errortarea, 
        agregarTarea, 
        validarTarea, 
        obtenerTareas, 
        actualizaTarea, 
        limpiarTarea
    } = tareasContext;

    //EFFECT QUE DETECTA SI HYA UNA TAREA SELECCIONADA
    useEffect(() => {
        if(tareaseleccionada !== null){
            setTarea(tareaseleccionada)
        } else {
            setTarea({
                nombre : ''
            })
        }
    }, [tareaseleccionada])

    //STATE DEL FORMULARIO
    const [tarea, setTarea] = useState({
        nombre : ''
    })

    //EXTRAE REL NOMBRE
    const {nombre} = tarea;

    //SI NO HAY PROYECTO SELECCIONADO
    if(!proyecto) return null

    //ARRAY DESTRUCTURING PARA EXTRAER EL PROYECTO
    const [proyectoActual] = proyecto;

    //LEER LOS VALORES DEL FORMUARIO
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        //VALIDAR
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }
 
        //REVISAR SI ES EDICION O AGREGAR UNA TAREA 
        if(tareaseleccionada === null){
            //ENTONCES ES UNA TAREA NUEVA
            //AGREGAR LA NUEVA TAREA AL STATE DE TAREAS
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            //ENTONCES ES UNA TAREA EXISTENTE
            actualizaTarea(tarea);

            //ELIMINAR TAREA SELECCIONADA DEL STATE
            limpiarTarea();
        }

        //OBTENER Y FILTRAR LA TAREAS DEL PROYECTO
        obtenerTareas(proyectoActual.id);


        //REINICIAR EL FORM
        setTarea({
            nombre : ''
        })
    }

    return (  
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className='input-text'
                        placeholder='Nombre Tarea'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>    
            </form>
            {errortarea ? <p className='mensaje error'>El nombre de la tarea es Obligatorio</p> : null}
        </div>
    );
}
 
export default FormTarea