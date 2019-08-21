import React, { Component } from 'react'
import {Segment, Form, Button, Grid, Header, Label, Message} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import Loader from '../components/Loading';

import { registroValidador } from '../utils/ReduxFormValidations'
import LocalStorageService from '../services/LocalStorageService';
import {SESSION_NAME} from '../utils/Constants'

class Registrarse extends Component{

    constructor(props){
        super(props)

        this.registrarse = this.registrarse.bind(this)
        this.renderField = this.renderField.bind(this)
        this.redirectSiExisteSesion = this.redirectSiExisteSesion.bind(this)

        this.state = {
            cargando: false,
            serverError: false,
            serverRequest: null,
        }
    }

    componentWillMount(){
        this.redirectSiExisteSesion()
    }

    redirectSiExisteSesion(){
        if(LocalStorageService.existItem(SESSION_NAME)){
            this.props.history.push("/mi_nube");
        }
    }

    registrarse(values){
        this.setState({cargando: true})
        
        setTimeout(()=>{
            this.setState({cargando: false})
        }, 3000)
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
                iconName = '';
            break;
        }

        return(
            <Form.Field>
                <label className='label-form'>{label}</label>
                <Form.Input {...input} fluid  icon = {iconName} iconPosition = 'left' type = {type} placeholder = {label} />
                {
                    touched &&
                    (error && <Label basic color = 'red' pointing>{error}</Label>)
                }
            </Form.Field>
        )
    }

    render(){
        return(
            <React.Fragment>
                <Segment basic>
                    {this.state.cargando && <Loader texto = 'Registrandote...' />}
                    <Grid textAlign = 'center' verticalAlign='middle' style={{height: '100vh'}}>
                        <Grid.Column style = {{maxWidth: '35em'}}>
                            <Form size='large' onSubmit = {this.props.handleSubmit(this.registrarse)}>
                                <Segment>
                                    <Header as = 'h1'>Registrarse</Header>
                                    <Field name = 'email' type = 'email' component = { this.renderField } label = 'Correo electrónico' />
                                    <Field name = 'password' type = 'password' component = { this.renderField } label = 'Contraseña' />
                                    <Field name = 'rePassword' type = 'password' component = { this.renderField } label = 'Repetir contraseña' />
                                    <Form.Field>
                                        <h4>¿Ya tienes cuenta? <a href=''><Link to = '/login'>Inicia sesión</Link></a> </h4>
                                    </Form.Field>
                                    {this.state.serverError && 
                                    <Form.Field>
                                        <Message negative> <p>{this.state.serverRequest.mensaje}</p> </Message>
                                    </Form.Field>
                                    }
                                    <Button fluid color = 'green' type = 'submit'>
                                        Registrarse
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

Registrarse = connect(mapStateToProps)(withRouter(Registrarse))

export default reduxForm({
    form: 'registro',
    validate: registroValidador,
})(Registrarse)