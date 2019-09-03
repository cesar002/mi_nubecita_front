import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Menu, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

import ApiService from '../services/ApiService'
import LocalStorageService from '../services/LocalStorageService'

import * as actions from '../redux/actions/logoutActions'
import * as userAction from '../redux/actions/userDataAction'
import * as userFilesAction from '../redux/actions/userDataFilesActions'

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
            this.props.deleteUserData();
            this.props.deleteUserDataFiles();
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
                            {this.props.userData && 
                            <h4>{this.props.userData.me}</h4>
                            }
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
        userData: state.userData,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        setLogoutAction(active){
            dispatch(actions.logoutRequestActive(active));
        },
        deleteUserData(){
            dispatch(userAction.deleteEmailUser())
        },
        deleteUserDataFiles(){
            dispatch(userFilesAction.deleteInfo())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))