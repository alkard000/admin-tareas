import React, {useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';



import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/index';

const TareaState = props => {
    const initialState = {
        tareas : [
            {id : 1, nombre : 'Elegir plataforma', estado : true, proyectoId : 1},
            {id : 2, nombre : 'Elegir Dominio', estado : false, proyectoId : 2},
            {id : 3, nombre : 'Elegit productos', estado : true, proyectoId : 3},
            {id : 4, nombre : 'Elegir clientes', estado : true, proyectoId : 3},
            {id : 5, nombre : 'Elegir plataforma', estado : true, proyectoId : 1},
            {id : 6, nombre : 'Elegir Dominio', estado : false, proyectoId : 1},
            {id : 7, nombre : 'Elegit productos', estado : true, proyectoId : 3},
            {id : 8, nombre : 'Elegir clientes', estado : true, proyectoId : 3},
            {id : 9, nombre : 'Elegir plataforma', estado : true, proyectoId : 1},
            {id : 10, nombre : 'Elegir Dominio', estado : false, proyectoId : 2},
            {id : 11, nombre : 'Elegit productos', estado : true, proyectoId : 2},
            {id : 12, nombre : 'Elegir clientes', estado : true, proyectoId : 3}
        ],
        tareasproyecto : null,
        errortarea : false,
        tareaseleccionada : null
    }

    //CREAR DISPATCH Y STATE
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //CREAR LAS FUNCIONES

    //OBTENER LAS TAREAS DE UN PROYECTO
    const obtenerTareas = proyectoId => {
        dispatch({
            type : TAREAS_PROYECTO,
            payload : proyectoId
        })
    }

    //AGREGAR UNA TAREA AL PROYECTO SELECCIONADO
    const agregarTarea = tarea => {
        tarea.id = uuidv4();
        dispatch({
            type : AGREGAR_TAREA,
            payload : tarea
        })
    }

    //VALIDA Y MUESTRA UN ERROR
    const validarTarea = () => {
        dispatch({
            type : VALIDAR_TAREA
        })
    }

    //ELIMINAR TAREAS POR ID
    const eliminarTarea = id => {
        dispatch({
            type : ELIMINAR_TAREA,
            payload : id
        })
    }

    //CAMBIA EL ESTADO DE CADA TAREA
    const cambiarEstado = tarea => {
        dispatch({
            type : ESTADO_TAREA,
            payload : tarea
        })
    }

    //EXTRAE UNA TAREA PARA EDICION
    const guardarTareaActual = tarea => {
        dispatch({
            type : TAREA_ACTUAL,
            payload : tarea
        })
    }

    //EDITA Y MODIFOCA UNA TAREA
    const actualizaTarea = tarea => {
        dispatch({
            type : ACTUALIZAR_TAREA,
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
                tareas : state.tareas,
                tareasproyecto : state.tareasproyecto,
                errortarea : state.errortarea,
                tareaseleccionada : state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstado,
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