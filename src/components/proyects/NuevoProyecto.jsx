import React, { Fragment, useContext, useState } from 'react';

import proyectoContext from '../../context/proyects/proyectoContext';

const NuevoProyecto = () => {

    //OBTENER EL STATE DEL FORMULARIO
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

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

        //VALIDAR PROYECTO
        if(nombre === ''){
            mostrarError();
            return;
        }

        //AGREGAR AL STATE
        agregarProyecto(proyecto);

        //REINICIAR EL FORM
        setProyecto({
            nombre : ''
        })
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

        {errorformulario ? <p className='mensaje error'>El nombre es obligatorio</p> : null}

        </Fragment>
    );
}

export default NuevoProyecto;