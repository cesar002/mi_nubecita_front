import React, { Component } from 'react';
import {Grid, Container, Segment, Header, Icon, Button} from 'semantic-ui-react';
import {ContextMenuTrigger} from 'react-contextmenu'
import _ from 'lodash'

import {NUMBER_ELEMENT_VIEW} from '../utils/Constants'

import FileItem from '../components/FileItem'
import MenuContextual from '../components/ContextMenuArchivos'

export default class ContenedorArchivos extends Component{

    constructor(props){
        super(props)

        this.state = {
            archivos:[
                {nombre: 'documento 1',  tipo: 'document',  extencion: '.docx', fecha: '10 junio 2009'},
                {nombre: 'documento 2',  tipo: 'audio',     extencion: '.mp3',  fecha: '15 julio 2009'},
                {nombre: 'documento 3',  tipo: 'acrobat',   extencion: '.pdf',  fecha: '10 septiembre 2009'},
                {nombre: 'documento 4',  tipo: 'document',  extencion: '.ppt',  fecha: '25 abril 2009'},
                {nombre: 'documento 5',  tipo: 'image',     extencion: '.jpg',  fecha: '30 enero 2009'},
                {nombre: 'documento 6',  tipo: 'video',     extencion: '.mp4',  fecha: '01 febrero 2009'},
                {nombre: 'documento 7',  tipo: '3d',        extencion: '.bld',  fecha: '11 marzo 2009'},
                {nombre: 'documento 8',  tipo: 'compressed',extencion: '.rar',  fecha: '08 septiembre 2009'},
                {nombre: 'documento 9',  tipo: 'document',  extencion: '.xlsx', fecha: '06 mayo 2009'},
                {nombre: 'documento 10', tipo: 'acrobat',   extencion: '.pdf',  fecha: '11 diciembre 2009'},
                {nombre: 'documento 11', tipo: 'image',     extencion: '.jpg',  fecha: '22 octubre 2009'},
            ],
            scrollEnabled: false,
            isEmpty: true,
        }
    }

    componentWillMount(){
        if(this.state.archivos.length > 15){
            this.setState({scrollEnabled: true})
        }
    }


    _renderGridRow(arrayRoot){
        return arrayRoot.map((array, key) => {
            return(
                <Grid.Row key={key} columns = {NUMBER_ELEMENT_VIEW}>
                    {this._renderGridElement(array)}
                </Grid.Row>
            )
        })
    }

    _renderGridElement(elements){
        return elements.map((item, key) => {
            return(
                <Grid.Column key = {key}>
                    <FileItem />
                </Grid.Column>
            )
        })
    }

    _renderFiles(){
        let datos = _.chunk(this.state.archivos, NUMBER_ELEMENT_VIEW)
        return this._renderGridRow(datos)
    }

    _fileContainer(){
        return(
            <ContextMenuTrigger id = 'fileContainer'>
                <Grid>
                    {this._renderFiles()}
                </Grid>
            </ContextMenuTrigger>
        )
    }

    _fileContainerWithoutFiles(){
        return(
            <Segment placeholder basic>
                <Header icon>
                    <Icon name = 'file alternate outline' />
                    Aun no hay archivos para mostrar, sube tu primer archivo
                </Header>
                <Button primary>
                    Subir archivo
                </Button>
            </Segment>
        )
    }


    render(){
        return(
            <React.Fragment>
                <Container fluid style = {this.state.scrollEnabled? scrollStyle : {}}>
                    <Segment basic>
                        {this.state.isEmpty && this._fileContainerWithoutFiles()}
                        {!this.state.isEmpty && this._fileContainer()}
                    </Segment>
                </Container>
                <MenuContextual idContextTrigger = 'fileContainer' />
            </React.Fragment>
        )
    }
}

const scrollStyle = {overflowY: 'scroll', overflowX: 'hidden', maxHeight: '40rem'}