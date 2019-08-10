import React from 'react'
import {Menu, Segment, Button, Container, Icon, Header} from 'semantic-ui-react';

const Principal = () =>(
    <React.Fragment>
        <Menu attached = 'top' pointing size='large' inverted>
            <Menu.Item 
                name = 'Mi Nubecita'
                content = 'Mi Nubecita'
            />
            <Menu.Menu position = 'right' >
                <Menu.Item >
                    <Button primary>Login</Button>
                </Menu.Item>
                <Menu.Item >
                    <Button secondary >Registrarse</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        <Container fluid textAlign='center'
            style = {{
                background: 'url(../images/backgorund.jpg)',
                backgroundPositionX: 'center',
                backgroundPositionY: 'center',
            }}
        >   
                <Header as='h1' inverted
                    style ={{
                        fontSize: '4em',
                        marginBottom: 0,
                        // marginTop: '3em',
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
                        // marginTop: '2em'
                    }}
                >
                    Entrar a nubecita
                    <Icon name='right arrow' />
                </Button>
        </Container>
        <Container>

        </Container>
    </React.Fragment>
)

export default Principal;