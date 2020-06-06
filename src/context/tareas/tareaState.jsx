import React, {useReducer} from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/index';

const TareaState = props => {
    const initialState = {
        tareasproyecto : [],
        errortarea : false,
        tareaseleccionada : null
    }

    //CREAR DISPATCH Y STATE
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //CREAR LAS FUNCIONES

    //OBTENER LAS TAREAS DE UN PROYECTO
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params : {proyecto}});

            dispatch({
                type : TAREAS_PROYECTO,
                payload : resultado.data.tareas
            }) 
        } catch (error) {
            console.log(error)
        }
    }

    //AGREGAR UNA TAREA AL PROYECTO SELECCIONADO
    const agregarTarea = async tarea => {
        try {

            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);

            dispatch({
                type : AGREGAR_TAREA,
                payload : tarea
            })    
        } catch (error) {
            console.log(error)
        }
    }

    //VALIDA Y MUESTRA UN ERROR
    const validarTarea = () => {
        dispatch({
            type : VALIDAR_TAREA
        })
    }

    //ELIMINAR TAREAS POR ID
    const eliminarTarea = async (id, proyecto) => {
    
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params : {proyecto}})

            dispatch({
                type : ELIMINAR_TAREA,
                payload : id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //EDITA Y MODIFOCA UNA TAREA
    const actualizaTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)

            dispatch({
                type : ACTUALIZAR_TAREA,
                payload : resultado.data.tarea
            })    
        } catch (error) {
            
        }
    }

    //EXTRAE UNA TAREA PARA EDICION
    const guardarTareaActual = tarea => {
        dispatch({
            type : TAREA_ACTUAL,
            payload : tarea
        })
    }

    //ELIMINAR LA TAREA SELECCIONADA
    const limpiarTarea = () => {
        dispatch({
            type : LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareasproyecto : state.tareasproyecto,
                errortarea : state.errortarea,
                tareaseleccionada : state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizaTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;