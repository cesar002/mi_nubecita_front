import React, { Component } from 'react'

import AppView from '../components/AppViewTemplate'

const wea = () =><p>archivos</p>

export default class MiNube extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <AppView component = {wea} />
        )
    }

}
