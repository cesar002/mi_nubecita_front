import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import AppView from '../components/AppViewTemplate'
import ContenedorArchivos from '../components/ContenedorArchivos'

import * as actions from '../redux/actions/emailUserAction';
import ApiService from '../services/ApiService'
import LocalStorageService from '../services/LocalStorageService';

class MiNube extends Component{
    constructor(props){
        super(props)


        this.state = {
            responseServer:{},
        }
    }


    componentWillMount(){
        if(this.props.userEmail){
            return
        }

        ApiService.getMe()
        .then(resp =>{
            console.log(resp)
            this.props.setEmailUser(resp.me)
        })
        .catch(err =>{
            LocalStorageService.deleteSessionToken()
            this.props.history.push('/')
        })
    }


    render(){
        return(
            <AppView component = {ContenedorArchivos} />
        )
    }

}


const mapStateTuProps = state =>{
    return{
        userEmail: state.emailUser.email_user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        setEmailUser(email){
            dispatch(actions.setEmailUser(email));
        }
    }
}

export default connect(mapStateTuProps, mapDispatchToProps)(withRouter(MiNube))
