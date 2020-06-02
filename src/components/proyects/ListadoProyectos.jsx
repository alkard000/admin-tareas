import React, {useContext, useEffect} from 'react';

import Proyecto from './Proyecto';

import proyectoContext from '../../context/proyects/proyectoContext';

const ListadoProyectos = () => {

    //OBTENERLOS PROYECTO DEL STATE INICIAL
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyecto } = proyectosContext;

    //OBTENER PROYECTOS CUANDO CARGA EL COMPONENTE
    useEffect(() => {
        obtenerProyecto();
    }, []);

    //REVISAR SI EXISTE CONTENIDO
    if(proyectos.length === 0) return null;

    return (  
        <ul className="listado-proyectos">
            {proyectos.map(proyecto => (
                <Proyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                />
            ))}
        </ul>
    );
}
 
export default ListadoProyectos;
