import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import clienteAxios from '../../config/axios';

import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario : false,
        proyecto : null,
        mensaje : null
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
    const obtenerProyecto = async () => {
        try {

            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type : OBTENER_PROYECTOS,
                payload : resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    //AGREGAR NUEVO PROYECTO
    const agregarProyecto = async proyecto => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);
            //INSERTAR EL PROYECTO EN EL STATE
            dispatch({
                type : AGREGAR_PROYECTO,
                payload : resultado.data
            })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
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
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
            type : ELIMINAR_PROYECTO,
            payload : proyectoId
        })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    return(
        <proyectoContext.Provider
            value={{
                //STATE
                proyectos : state.proyectos,
                formulario : state.formulario,
                errorformulario : state.errorformulario,
                proyecto : state.proyecto,
                mensaje : state.mensaje,
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