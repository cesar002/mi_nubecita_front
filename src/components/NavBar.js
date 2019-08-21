import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Menu, Button} from 'semantic-ui-react'

class NavBar extends Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <React.Fragment>
                <Menu attached = 'top' pointing size = 'large' inverted fluid> 
                    <Menu.Item 
                        name = 'Mi Nubecita'
                        content = 'Mi Nubecita'
                    />
                    <Menu.Menu position = 'right'>
                        <Menu.Item>
                            <h3>Usuario</h3>
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

export default withRouter(NavBar)