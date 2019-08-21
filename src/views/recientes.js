import React, { Component } from 'react'

import AppView from '../components/AppViewTemplate'

const wea = () =><p>Recientes</p>

export default class Recientes extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <AppView component = {wea} />
        )
    }

}
