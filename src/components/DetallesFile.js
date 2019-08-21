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
                <Segment.Group piled >
                    <Segment>
                        <Container fluid textAlign ='center'>
                            <Icon name = 'file' size = 'massive' color = 'grey'/>
                            <Header as = 'h3'>
                                Archivito
                                <Header.Subheader>36 mb - subido el 12/1/2009</Header.Subheader>
                            </Header>
                        </Container>
                    </Segment>
                    <Segment>
                        <Header as = 'h4' style={{color: '#1C1C1C'}}>Información:</Header>
                        <Header as = 'h5'></Header>
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