import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Segment, Form, Button, Grid, Header, Label, Message, } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import Loader from '../components/Loading';

import {SESSION_NAME} from '../utils/Constants'
import { loginValidador } from '../utils/ReduxFormValidations'

import LocalStorageService from '../services/LocalStorageService';



class Login extends Component{

    constructor(props){
        super(props)

        this.renderField = this.renderField.bind(this)
        this.iniciarSesion = this.iniciarSesion.bind(this)
        this.guardarSesion = this.guardarSesion.bind(this)
        this.redirectSiExisteSesion = this.redirectSiExisteSesion.bind(this)

        this.state = {
            serverError: false,
            cargando: false,
            serverRequest: null,
        }
    }

    componentWillMount(){
        this.redirectSiExisteSesion();
    }

    iniciarSesion(values){

        this.setState({cargando: true})
        
        setTimeout(()=>{
            this.setState({cargando: false})
        }, 3000)
    
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
                                    {this.state.serverError && 
                                    <Form.Field>
                                        <Message negative> <p>{this.state.serverRequest.mensaje}</p> </Message>
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