import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Segment, Form, Button, Grid, Header, Label, Message, } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import Loader from '../components/Loading';

import {SESSION_NAME} from '../utils/Constants'
import { loginValidador } from '../utils/ReduxFormValidations'

import LocalStorageService from '../services/LocalStorageService';
import ApiService from '../services/ApiService';



class Login extends Component{

    constructor(props){
        super(props)

        this.renderField = this.renderField.bind(this)
        this.iniciarSesion = this.iniciarSesion.bind(this)
        this.guardarSesion = this.guardarSesion.bind(this)
        this.redirectSiExisteSesion = this.redirectSiExisteSesion.bind(this)

        this.state = {
            cargando: false,
            serverResponse: {},
        }
    }

    componentWillMount(){
        this.redirectSiExisteSesion();
    }

    iniciarSesion(values){
        this.setState({cargando: true})

        ApiService.login(values)
        .then(res =>{
            this.setState({cargando: false})
            if(res.status !== 1){
                this.setState({serverResponse: res})
                return
            }
            this.guardarSesion(res.access_token)
            this.props.history.push("/mi_nube");
        })
        .catch(err =>{
            this.setState({serverResponse: err})
            this.setState({cargando: false})
        });
    
    }

    guardarSesion(jwToken){
        LocalStorageService.setItem(SESSION_NAME, jwToken)
    }

    redirectSiExisteSesion(){
        if(LocalStorageService.existItem(SESSION_NAME)){
            this.props.history.push("/mi_nube");
        }
    }

    renderField(data){
        let { input, label, type, meta:{touched, error} } = data
        let iconName = ''

        switch(type){
            case 'password':
                iconName = 'key'
            break;
            case 'email':
                iconName = 'mail'
            break;
            default:
                iconName = ''
            break;
        }

        return(
            <Form.Field>
                <label className='label-form'>{label}</label>
                <Form.Input {...input} fluid icon= {iconName} iconPosition='left' placeholder = {label} type = {type} />
                {touched &&
                    (error && <Label basic color='red' pointing>{error}</Label>)
                }
            </Form.Field>
        )
    }

    render(){
        return(
            <React.Fragment>
                <Segment basic>
                    {this.state.cargando && <Loader texto = 'Iniciando sesión...'/>}
                    <Grid textAlign = 'center' verticalAlign='middle' style={{height: '100vh'}}>
                        <Grid.Column style = {{maxWidth: '35em'}}>
                            <Form size='large' onSubmit = {this.props.handleSubmit(this.iniciarSesion)}>
                                <Segment>
                                    <Header as = 'h1'>Entrar</Header>
                                    <Field name = 'email' type = 'email' component = { this.renderField } label = 'Correo'/>
                                    <Field name = 'password' type = 'password' component = { this.renderField } label = 'Contraseña'/>
                                    <h4>¿no tienes cuenta? <a href=''><Link to='/registrarse'>Registrate</Link></a></h4>
                                    {(this.state.serverResponse.status === 2 || this.state.serverResponse.status === 0 || this.state.serverResponse.status === -1) && 
                                    <Form.Field>
                                        <Message negative> <p>{this.state.serverResponse.mensaje}</p> </Message>
                                    </Form.Field>
                                    }
                                    <Button fluid color = 'green' type = 'submit'>
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

const mapStateToProps = state =>{
    return{
        formState: state.form
    }
}

Login = connect(mapStateToProps)(withRouter(Login))

export default reduxForm({ 
    form: 'login',
    validate: loginValidador, 
})(Login)