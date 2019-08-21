import React, { Component } from 'react'

import AppView from '../components/AppViewTemplate'

const wea = () =><p>favoritos</p>

export default class Favoritos extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <AppView component = {wea} />
        )
    }

}
