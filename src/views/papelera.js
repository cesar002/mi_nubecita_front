import React, { Component } from 'react'

import AppView from '../components/AppViewTemplate'

const wea = () =><p>Papelera</p>

export default class Papelera extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <AppView component = {wea} />
        )
    }

}
