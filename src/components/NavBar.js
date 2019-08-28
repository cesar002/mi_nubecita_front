import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Menu, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

import ApiService from '../services/ApiService'
import LocalStorageService from '../services/LocalStorageService'

class NavBar extends Component{
    constructor(props){
        super(props)
    }

    logout(){
        ApiService.logout()
        .then(res =>{
            LocalStorageService.deleteSessionToken()
            this.props.history.push('/')
        })
        .catch(err =>{

        })
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
                            <Button secondary onClick = {()=>{}}>
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
        userEmail: state.emailUser.email_user
    }
}

export default connect(mapStateToProps)(withRouter(NavBar))