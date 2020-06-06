import React, {useState, useContext, useEffect} from 'react';

import {Link} from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //EXTRAER LOS VALORES DEL CONTEXT
    const alertasContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertasContext;

    //CONTEXT DE AUTENTICACION
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

    //EN CASO DE QUE EL USUARIO O PASSWORD SEAN INCORRECTOS
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){    
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje, autenticado, props.history]);

    const [usuario, setUsuario] = useState({
        email : '',
        password : ''
    })

    //EXTRAER
    const {email, password} = usuario;

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
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campor son Obligatorios', 'alerta-error');
        }

        //PASARLO A LA ACTION
        iniciarSesion({email, password});
    }

    return (  
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={handleSubmit}
                >
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
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                        />
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}
 
export default Login;