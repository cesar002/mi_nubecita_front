import React, { Component } from 'react'

import AppView from '../components/AppViewTemplate'
import ContenedorArchivos from '../components/ContenedorArchivos'

const wea = () =><p>archivos</p>

export default class MiNube extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <AppView component = {ContenedorArchivos} />
        )
    }

}
