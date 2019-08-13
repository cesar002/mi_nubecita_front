import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import DashBoard from '../views'
import Login from '../views/login'

const Router =() => (
    <BrowserRouter>
        <React.Fragment>
            <Route exact path = "/" component = {DashBoard} />
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/registrarse" />
            <Route exact path = "/logout" />
            <Route exact path = "/verificar/:code" />
            <Route exact path = "/recuperar_password/:code" />
            <Route exact path = "/mi_nube" />
            <Route exact path = "/mi_nube/:id" />
            <Route exact path = "/mi_nube/papelera" />
            <Route exact path = "/mi_nube/compartir/:code" />
        </React.Fragment>
    </BrowserRouter>
)

export default Router;