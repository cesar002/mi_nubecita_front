import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Menu, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

import Loader from './Loading'

import ApiService from '../services/ApiService'
import LocalStorageService from '../services/LocalStorageService'

import * as actions from '../redux/actions/logoutActions'

class NavBar extends Component{
    constructor(props){
        super(props)

        this.logout = this.logout.bind(this)
    }

    logout(){
        this.props.setLogoutAction(true)

        ApiService.logout()
        .then(res =>{
            this.props.setLogoutAction(false)
            LocalStorageService.deleteSessionToken()
            this.props.history.push('/')
        })
        .catch(err =>{ this.props.setLogoutAction(false)})
    }


    render(){
        return(
            <React.Fragment>
                <Menu attached = 'top' pointing size = 'large' inverted> 
                    <Menu.Item 
                        name = 'Mi Nubecita'
                        content = 'Mi Nubecita'
                    />
                    <Menu.Menu position = 'right'>
                        <Menu.Item>
                            <h4>{this.props.userEmail}</h4>
                        </Menu.Item>
                        <Menu.Item>
                            <Button secondary onClick = {this.logout}>
                                Cerrar
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state =>{
    return{
        userEmail: state.emailUser.email_user,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        setLogoutAction(active){
            dispatch(actions.logoutRequestActive(active));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))