import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Container, Icon, Segment, Header} from 'semantic-ui-react'

class DetallesFile extends Component{
    constructor(props){
        super(props)
    }
    
    //{overflowY: 'scroll', overflowX: 'hidden'}
    render(){
        return(
            <React.Fragment>
                <Segment.Group piled>
                    <Segment>
                        <Container fluid textAlign ='center'>
                            <Icon name = 'file' size = 'massive' color = 'grey'/>
                            <Header as = 'h3'>
                                Archivito
                            </Header>
                        </Container>
                    </Segment>
                    <Segment>
                        <Header as = 'h4' style={{color: '#1C1C1C'}}>Información:</Header>
                        <Header as = 'h5'>
                            Tipo de archivo:
                            <Header.Subheader>archivo de texto</Header.Subheader>
                        </Header>
                        <Header as = 'h5'>
                            Fecha de subida:
                            <Header.Subheader>10 de enero de 2009</Header.Subheader>
                        </Header>
                        <Header as = 'h5'>
                            Tamaño del archivo
                            <Header.Subheader>10 MB</Header.Subheader>
                        </Header>
                    </Segment>
                </Segment.Group>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return{

    }
}

export default connect(mapStateToProps)(DetallesFile)