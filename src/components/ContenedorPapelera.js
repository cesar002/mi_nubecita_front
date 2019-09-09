import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Container, Segment, Header, Icon, Grid, Dropdown} from 'semantic-ui-react';
import _ from 'lodash'

import FileItem from './FileItem'

import {NUMBER_ELEMENT_VIEW} from '../utils/Constants'

class ContenedorPapelera extends Component{
    constructor(props){
        super(props)

        this.state = {
            opcionesOrdenar:[
                {key: 0, text: 'Seleccione una opción', value: 0},
                {key: 1, text: 'Nombre de archivo', value: 1},
                {key: 2, text: 'Fecha de subida', value: 2},
                {key: 3, text: 'Tipo de archivo', value: 3},
                {key: 4, text: 'Tamaño de archivo', value: 4},
            ],
        }

    }

    _orderFiles(type){

    }

    _renderFileElement(files){
        return files.map((file, key) =>{
            return(
                <Grid.Column key = {key}>
                    <FileItem file = {file} idFile = {file.idArchivoBorrado} nombreArchivo = {file.nombreCorto} titulo = {file.nombre} fecha = {file.fechaSubida} tipo={file.tipo} selected = {file.selected} />
                </Grid.Column>
            )
        })
    }

    _renderGridFiles(){
        let fileRow = _.chunk(this.props.deletedFiles, NUMBER_ELEMENT_VIEW)
        return(
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column width = {16}>
                        {
                        this.props.deletedFiles.length > 0 &&
                        <span style = {{zIndex: '2'}}>
                            Ordenar por: {' '}
                            <Dropdown inline options={this.state.opcionesOrdenar} defaultValue={this.state.opcionesOrdenar[0].value} onChange = {(e,data)=>{this._orderFiles(data.value)}} />
                        </span>
                        }
                    </Grid.Column>
                </Grid.Row>
                {
                    fileRow.map((files, key) =>{
                        return(
                            <Grid.Row key={key} columns = {NUMBER_ELEMENT_VIEW}>
                                {this._renderFileElement(files)}
                            </Grid.Row>
                        )
                    })
                }
            </React.Fragment>
        )
    }

    _renderElementWithoutFiles(){
        return(
            <Segment placeholder basic>
                <Header icon>
                    <Icon name = 'trash alternate outline' />
                    <p>Aun no hay archivos eliminados</p>
                </Header>
            </Segment>
        );
    }

    render(){
        return(
            <Container fluid style = {this.props.deletedFiles.length > 20? scrollStyle : {}}>
                <Segment basic>
                    {this.props.deletedFiles.length === 0 && this._renderElementWithoutFiles()}
                    {this.props.deletedFiles.length !== 0 && <Grid>{this._renderGridFiles()}</Grid>}
                </Segment> 
            </Container>
        )
    }

}

const scrollStyle = {overflowY: 'scroll', overflowX: 'hidden', maxHeight: '40rem'}

const mapStateToProps = state => {
    return{
        deletedFiles: state.userFiles.deleteFiles
    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContenedorPapelera)

