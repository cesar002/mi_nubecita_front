import React, { Component } from 'react'

import AppView from '../components/AppViewTemplate';
import ContenedorPapelera from '../components/ContenedorPapelera'

export default class Papelera extends Component{
    render(){
        return(
            <AppView component = {ContenedorPapelera} />
        );
    }
}