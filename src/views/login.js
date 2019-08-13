import React from 'react'
import {Link} from 'react-router-dom'
import {Segment, Form, Button, Grid, Header} from 'semantic-ui-react'

const Login = () =>(
    <React.Fragment>
        <Grid textAlign = 'center' verticalAlign='middle' style={{height: '100vh'}}>
            <Grid.Column style = {{maxWidth: '35em'}}>
                <Header as = 'h1'>Entrar</Header>
                <Form size='large'>
                    <Segment>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder = 'Correo electrónico' />
                        <Form.Input fluid icon='lock' iconPosition = 'left' type = 'password' placeholder = 'contraseña' />
                        <h4>¿no tienes cuenta? <a href=''><Link to='/registrarse'>Registrate</Link></a></h4>
                        <Button fluid color = 'green'>
                            Entrar
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </React.Fragment>
)

export default Login;       