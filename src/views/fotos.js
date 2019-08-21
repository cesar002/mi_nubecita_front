import React, { Component } from 'react'

import AppView from '../components/AppViewTemplate'

const wea = () =><p>Fotos</p>

export default class Fotos extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <AppView component = {wea} />
        )
    }

}
