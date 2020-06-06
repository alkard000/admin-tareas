import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyects/Proyectos';

import ProyectoState from './context/proyects/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import RutaPrivada from './components/rutas/RutaPrivada';

import tokenAuth from './config/tokenAuth';

//REVISAR SI HAY UN TOKEN
const token = localStorage.getItem('token');

if(token){
  tokenAuth(token);
}


function App() {
  return (
    <TareaState>
      <ProyectoState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/nueva-cuenta' component={NuevaCuenta}/>
                <RutaPrivada exact path='/proyectos' component={Proyectos}/>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </ProyectoState>
    </TareaState>
  );
}

export default App;
