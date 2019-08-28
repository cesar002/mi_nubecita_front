import React, {Component}from 'react';
import {Container, Header, Segment, Message, Grid} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'

import Loading from '../components/Loading'

import ApiService from '../services/ApiService'


class VerificarCorreo extends Component{
    constructor(props){
        super(props)

        this.state = {
            verificando: true,
            serverResponse: {}
        }
    }    

    componentDidMount(){
        ApiService.verificarCuenta(this.props.match.params.code)
        .then(res => {
            this.setState({serverResponse: res})
            this.setState({verificando: false})
            console.log(res)
        })
        .catch(err => {
            this.setState({verificando: false})
        })
    }

    _renderSuccessMessage(){
        return <Message positive size = 'huge'><Message.Header style={{textAlign: 'center'}}>Registro éxitoso</Message.Header>
                    <p style={{textAlign: 'center'}}>
                        {this.state.serverResponse.mensaje}
                    </p>
                </Message>
    }

    _renderFailMessage(){
        return <Message error size = 'huge'><Message.Header style={{textAlign: 'center'}}>Hubo un problema</Message.Header><p style={{textAlign: 'center'}}>{this.state.serverResponse.mensaje}</p></Message>
    }

    render(){
        return(
            <React.Fragment>
                <div style={{height: '100vh', width: '100%'}}>
                    <Container>
                        {this.state.verificando && <Loading texto = 'Verificando...' />}
                        <Grid>
                            <Grid.Row centered verticalAlign ='middle' style={{height: '100vh'}}>
                                <Grid.Column width = {2} />
                                <Grid.Column width = {12}>
                                    <Segment basic>
                                            {this.state.serverResponse.status === 1 && !this.state.verificando && this._renderSuccessMessage()}
                                            {this.state.serverResponse.status !== 1 && !this.state.verificando && this._renderFailMessage()}
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width = {2} />
                            </Grid.Row>
                        </Grid>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(VerificarCorreo);