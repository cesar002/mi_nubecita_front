import React, { Component } from 'react'
import {Segment, Form, Button, Grid, Header, Label, Message} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import Loader from '../components/Loading';

import { registroValidador } from '../utils/ReduxFormValidations'
import LocalStorageService from '../services/LocalStorageService';
import {SESSION_NAME} from '../utils/Constants'
import ApiService from '../services/ApiService'

class Registrarse extends Component{

    constructor(props){
        super(props)

        this.registrarse = this.registrarse.bind(this)
        this.renderField = this.renderField.bind(this)
        this.redirectSiExisteSesion = this.redirectSiExisteSesion.bind(this)

        this.state = {
            cargando: false,
            serverResponse: {},
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

        ApiService.registrarse(values)
        .then(response =>{
            this.setState({serverResponse: response})
            this.setState({cargando: false})

            if(response.status === 1){
                this.props.reset()
            }
        })
        .catch(error => {
            this.setState({serverResponse: error})
            this.setState({cargando: false})
        })
    }

    _renderMensajesError(){
        return this.state.serverResponse.errors.map((item, key) =>
            <Message negative key = {key}> <p>{item}</p> </Message>
        )
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
                                    <Field name = 'password_confirmation' type = 'password' component = { this.renderField } label = 'Repetir contraseña' />
                                    <Form.Field>
                                        <h4>¿Ya tienes cuenta? <a href=''><Link to = '/login'>Inicia sesión</Link></a> </h4>
                                    </Form.Field>
                                    {
                                        this.state.serverResponse.status === 1 &&
                                        <Form.Field>
                                            <Message positive>
                                                <Message.Header>Registro éxitoso</Message.Header>
                                                <p>{this.state.serverResponse.mensaje}</p> 
                                            </Message>
                                        </Form.Field>
                                    }
                                    {(this.state.serverResponse.status === 2 && 
                                        <Form.Field>
                                            {this._renderMensajesError()}
                                        </Form.Field>
                                    )||(
                                        (this.state.serverResponse.status === 0 || this.state.serverResponse.status === -1) &&
                                        <Form.Field>
                                            <Message negative> <p>{this.state.serverResponse.mensaje}</p> </Message>
                                        </Form.Field>
                                    )   
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