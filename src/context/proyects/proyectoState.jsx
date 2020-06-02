import React, {useReducer} from 'react'

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS
} from '../../types';

const ProyectoState = props => {

    const proyectos = [
        {id : 1, nombre : 'Tienda Virtual'},
        {id : 2, nombre : 'Intranet'},
        {id : 3, nombre : 'Diseño'}
    ]

    const initialState = {
        proyectos : [],
        formulario : false
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

    return(
        <proyectoContext.Provider
            value={{
                proyectos : state.proyectos,
                formulario : state.formulario,
                mostrarFormulario,
                obtenerProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;