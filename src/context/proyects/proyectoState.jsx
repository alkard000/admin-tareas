import React, {useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';

const ProyectoState = props => {

    const proyectos = [
        {id : 1, nombre : 'Tienda Virtual'},
        {id : 2, nombre : 'Intranet'},
        {id : 3, nombre : 'Diseño'}
    ]

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario : false,
        proyecto : null
    }

    //DISPATCH PARA EJECUTAR LAS ACCIONES
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //FUNCIONES PARA EL CRUD DE PROYECTO
    const mostrarFormulario = () => {
        dispatch({
            type : FORMULARIO_PROYECTO
        })
    }

    //OBTENER LOS PROYECTOS
    const obtenerProyecto = () => {
        dispatch({
            type : OBTENER_PROYECTOS,
            payload : proyectos
        })
    }

    //AGREGAR NUEVO PROYECTO
    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();

        //INSERTAR EL PROYECTO EN EL STATE
        dispatch({
            type : AGREGAR_PROYECTO,
            payload : proyecto
        })
    }

    //VALIDA EL FORMULARIO POR ERRORE
    const mostrarError = () => {
        dispatch({
            type : VALIDAR_FORMULARIO
        })
    }

    //SELECCIONAR EL PROYECTO EN EL QUE S EDIO CLICK
    const proyectoActual = proyectoId => {
        dispatch({
            type : PROYECTO_ACTUAL,
            payload : proyectoId
        })
    }

    //ELIMINAR UN PROYECTO
    const eliminarProyecto = proyectoId => {
        dispatch({
            type : ELIMINAR_PROYECTO,
            payload : proyectoId
        })
    }

    return(
        <proyectoContext.Provider
            value={{
                //STATE
                proyectos : state.proyectos,
                formulario : state.formulario,
                errorformulario : state.errorformulario,
                proyecto : state.proyecto,
                //FUNCIONES
                mostrarFormulario,
                obtenerProyecto,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;