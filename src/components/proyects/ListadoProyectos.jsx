import React, {useContext, useEffect} from 'react';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Proyecto from './Proyecto';

import proyectoContext from '../../context/proyects/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    //OBTENERLOS PROYECTO DEL STATE INICIAL
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyecto } = proyectosContext;


    console.log(proyectos);

    //CONTEXT DE LAS ALERTAS
    const alertaContext = useContext(AlertaContext);
    const {mensaje, alerta, mostrarAlerta} = alertaContext;

    //OBTENER PROYECTOS CUANDO CARGA EL COMPONENTE
    useEffect(() => {

        //SI HAY ERROR
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyecto();
        // eslint-disable-next-line
    }, [mensaje]);

    //REVISAR SI EXISTE CONTENIDO
    if(proyectos.length === 0) return <p>No hay Proyectos, crea uno</p>;

    return (  
        <ul className="listado-proyectos">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</div> ) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames='proyecto'
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}
 
export default ListadoProyectos;
