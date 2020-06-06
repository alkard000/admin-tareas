import React, {useState, useContext, useEffect} from 'react';

import {Link} from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //EXTRAER LOS VALORES DEL CONTEXT
    const alertasContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertasContext;

    //CONTEXT DE AUTENTICACION
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    //EN CASO DE QUE EL USUARIO SE REGISTRE O AUTENTICADO
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line 
    }, [mensaje, autenticado, props.history]);

    const [usuario, setUsuario] = useState({
        nombre : '',
        email : '',
        password : '',
        confirmar : ''
    })

    //EXTRAER
    const {nombre, email, password, confirmar} = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario, 
            [e.target.name] : e.target.value
        })
    }

    //CUANDO SE INCIA SESION
    const handleSubmit = e => {
        e.preventDefault();
        
        //VALIDAR PARA QUE NO HAYA CAPOS VACIOS
        if( nombre.trim() === '' || 
            email.trim() === '' ||
            password.trim() === '' || 
            confirmar.trim() === ''){
            
            mostrarAlerta('Todos los campos son Obligatorios', 'alerta-error');
            return;
        }

        //PASSWORD MINIMOS DE 6 CARACTERES
        if(password.length < 6){
            mostrarAlerta('El password debe de ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        //LOS 2 PASSWORD SEAN IGUALES   
        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        //PASARLO A LA ACTION
        registrarUsuario({
            nombre, 
            email, 
            password
        });
    }

    return (  
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Repetir Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite Tu Password"
                            value={confirmar}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link to={'/'} className='enlace-cuenta'>
                    Volver a Iniciar Sesion
                </Link>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;