import React, {useContext, useEffect} from 'react';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Proyecto from './Proyecto';

import proyectoContext from '../../context/proyects/proyectoContext';

const ListadoProyectos = () => {

    //OBTENERLOS PROYECTO DEL STATE INICIAL
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyecto } = proyectosContext;

    //OBTENER PROYECTOS CUANDO CARGA EL COMPONENTE
    useEffect(() => {
        obtenerProyecto();
        // eslint-disable-next-line
    }, []);

    //REVISAR SI EXISTE CONTENIDO
    if(proyectos.length === 0) return <p>No hay Proyectos, crea uno</p>;

    return (  
        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
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
