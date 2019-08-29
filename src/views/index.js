import React, {Component} from 'react'
import {Menu, Segment, Button, Container, Icon, Header} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'

import LocalStorageService from '../services/LocalStorageService'

class Principal extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this._verificarSession();
    }

    _verificarSession(){
        if(LocalStorageService.existSessionToken()){
            this.props.history.push("/mi_nube");
        }
    }

    render(){
        return(
            <React.Fragment>
                <Menu attached = 'top' pointing size='large' inverted>
                    <Menu.Item 
                        name = 'Mi Nubecita'
                        content = 'Mi Nubecita'
                    />
                    <Menu.Menu position = 'right' >
                        <Menu.Item >
                            <Button primary onClick={()=>{this.props.history.push("/login")}}>Login</Button>
                        </Menu.Item>
                        <Menu.Item >
                            <Button secondary onClick={()=>{this.props.history.push("/registrarse")}}>Registrarse</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Container fluid textAlign='center'>   

                    <Segment basic         
                        style = {{
                            background: 'url(../images/backgorund.jpg)',
                            backgroundPositionX: 'center',
                            backgroundPositionY: 'center',
                            minHeight: '40rem',
                        }}>

                        <Header as='h1' inverted
                            style ={{
                                fontSize: '4em',
                                marginBottom: 0,
                                marginTop: '3em',
                            }}
                        >
                            MI NUBECITA
                        </Header>
                        <Header as = 'h2' inverted>
                            El lugar mas seguro para tus archivos
                        </Header>

                        <Button primary size='huge'
                            style={{
                                marginBottom: 0,
                                marginTop: '3em'
                            }}
                            onClick = {()=>{this.props.history.push('/login')}}
                        >
                            Entrar a nubecita
                            <Icon name='right arrow' />
                        </Button>
                    </Segment>
                </Container>
                <Container>

                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(Principal);