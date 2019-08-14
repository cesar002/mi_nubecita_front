import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Segment, Form, Button, Grid, Header, Label, Message, } from 'semantic-ui-react'

import Loader from '../components/Loading';

import {EMAIL_EXPRESSION} from '../utils/RegExpresions'
import {SESSION_NAME} from '../utils/Constants'
import LocalStorageService from '../services/LocalStorageService';

class Login extends Component{

    constructor(props){
        super(props)

        this.iniciarSesion = this.iniciarSesion.bind(this)
        this.guardarSesion = this.guardarSesion.bind(this)
        this.redirectSiExisteSesion = this.redirectSiExisteSesion.bind(this)
        this.validarCorreo = this.validarCorreo.bind(this)
        this.validarCamposLogin = this.validarCamposLogin.bind(this)

        this.state = {
            responseresult: null,
            email: '',
            pass: '',
            errorEmail: {
                formatoIncorrecto: false,
                completo: false,
            },
            errorPass: {
                completo: false
            },
            serverError: false,
            cargando: false,
        }
    }

    componentWillMount(){
        this.redirectSiExisteSesion();
    }

    iniciarSesion(){
        
        if(!this.validarCamposLogin()){
            return
        }

        this.setState({cargando: true})

        setTimeout(()=>{
            this.setState({cargando: false})
        }, 3000)
    
    }

    validarCamposLogin(){
        if(this.state.email === "" || this.state.pass === ""){
            
            let errEmail = this.state.email === "" ? true : false;
            let errPass = this.state.pass === "" ? true : false;

            this.setState({ errorEmail: {completo: errEmail} })
            this.setState({ errorPass: {completo: errPass} })

            return false
        }else{
            let errEmail = this.state.email === "" ? true : false;
            let errPass = this.state.pass === "" ? true : false;

            this.setState({ errorEmail: {completo: errEmail} })
            this.setState({ errorPass: {completo: errPass} })
        }

        if(!this.validarCorreo()){
            this.setState({ errorEmail: {formatoIncorrecto: true} })
            return false
        }else{
            this.setState({ errorEmail: {formatoIncorrecto: false} })
            return true
        }
    }

    guardarSesion(jwToken){
        LocalStorageService.setItem(SESSION_NAME, jwToken)
    }

    redirectSiExisteSesion(){
        if(LocalStorageService.existItem(SESSION_NAME)){
            this.props.history.push("/mi_nube");
        }
    }

    validarCorreo(){
        let regex = new RegExp(EMAIL_EXPRESSION);

        return regex.test(this.state.email)
    }

    render(){
        return(
            <React.Fragment>
                <Segment basic>
                    {this.state.cargando && <Loader texto = 'Iniciando sesión...'/>}
                    <Grid textAlign = 'center' verticalAlign='middle' style={{height: '100vh'}}>
                        <Grid.Column style = {{maxWidth: '35em'}}>
                                <Header as = 'h1'>Entrar</Header>
                                <Form size='large'>
                                    <Segment>
                                        <Form.Field>
                                            <Form.Input fluid icon='user' iconPosition='left' placeholder = 'Correo electrónico' type = 'email'
                                                value = {this.state.email} onChange = {(e)=>{ this.setState({ email: e.target.value }) }}
                                            />
                                            {this.state.errorEmail.completo && <Label basic color='red' pointing>Email incompleto</Label>}
                                            {this.state.errorEmail.formatoIncorrecto && <Label basic color = 'red' pointing>Email incorrecto</Label>}
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input fluid icon='lock' iconPosition = 'left' type = 'password' placeholder = 'contraseña' 
                                                value = {this.state.pass} onChange = {(e)=>{ this.setState( {pass: e.target.value} ) }}
                                            />
                                            {this.state.errorPass.completo && <Label basic color='red' pointing>Falta la contraseña</Label>}
                                        </Form.Field>
                                        <h4>¿no tienes cuenta? <a href=''><Link to='/registrarse'>Registrate</Link></a></h4>
                                        <Form.Field>
                                            {this.state.serverError && <Message negative> <p>error</p> </Message>}
                                        </Form.Field>
                                        <Button fluid color = 'green'
                                            onClick = {this.iniciarSesion}
                                        >
                                            Entrar
                                        </Button>
                                    </Segment>
                                </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </React.Fragment>
        )
    }

}

export default withRouter(Login);