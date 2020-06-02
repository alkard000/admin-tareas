import React, { Fragment, useContext, useState } from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';

const NuevoProyecto = () => {

    //OBTENER EL STATE DEL FORMULARIO
    const proyectosContext = useContext(proyectoContext);
    const { formulario, mostrarFormulario } = proyectosContext;

    //STATE PARA EL POYECTO
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    //EXTRAER VALORES 
    const { nombre } = proyecto;

    //LERR CONTENIDO DEL INPUT
    const handleChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //CUANDO S EENVIA EL PROYECTO
    const handleSubmitProyecto = e => {
        e.preventDefault();

        //TODO ==> VALIDAR PROYECTO


        //TODO ==> AGREGAR AL STATE

        //TODO ==> REINICIAR EL FORM
    }

    //MOSTRAR FOMULARIO DE NUEVO PROYECTO
    const handleClick = () => {
        mostrarFormulario();
    }

    return (
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={handleClick}
            >Nuevo Proyecto</button>

            {formulario

                ? (
                    <form
                        className='formulario-nuevo-proyecto'
                        onSubmit={handleSubmitProyecto}
                    >
                        <input
                            type="text"
                            className='input-text'
                            placeholder='Nombre Proyecto'
                            name="nombre"
                            value={nombre}
                            onChange={handleChangeProyecto}
                        />

                        <input
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Agregar Proyecto'
                        />
                    </form>
                )

            : null 
        }

        </Fragment>
    );
}

export default NuevoProyecto;