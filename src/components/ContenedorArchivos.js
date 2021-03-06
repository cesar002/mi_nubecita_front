import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Grid, Container, Segment, Header, Icon, Button, Dropdown} from 'semantic-ui-react';
import {ContextMenuTrigger} from 'react-contextmenu'
import _ from 'lodash'

import {NUMBER_ELEMENT_VIEW} from '../utils/Constants'

import FileItem from '../components/FileItem'

import ApiService from '../services/ApiService';

import * as fileActions from '../redux/actions/userDataFilesActions';
import * as userActions from '../redux/actions/userDataAction'
import {resetUploadProgress} from '../redux/actions/uploadProgressAction'

class ContenedorArchivos extends Component{

    constructor(props){
        super(props)

        this._uploadFiles = this._uploadFiles.bind(this)
        this._orderFiles = this._orderFiles.bind(this)
        this.fileInputReference = React.createRef()
        this.selectFile = this.selectFile.bind(this)

        this.state = {
            scrollEnabled: false,
            isEmpty: true,
            uploadFiles: false,
            opcionesOrdenar:[
                {key: 0, text: 'Seleccione una opción', value: 0},
                {key: 1, text: 'Nombre de archivo', value: 1},
                {key: 2, text: 'Fecha de subida', value: 2},
                {key: 3, text: 'Tipo de archivo', value: 3},
                {key: 4, text: 'Tamaño de archivo', value: 4},
            ],
        }

    }

    componentWillMount(){
        this.props.userFiles.files.length === 0? this.setState({isEmpty: true}) : this.setState({isEmpty: false})
        if(this.props.userFiles.files.length > 20){
            this.setState({scrollEnabled: true})
        }
    }

    selectFile(file){
        this.state.filesSelected.push(file);
    }

    _renderGridRow(arrayRoot){
        
        return(
        <React.Fragment>
            <Grid.Row>
                <Grid.Column width = {16}>
                    {
                    this.props.userFiles.files.length > 0 &&
                    <span style = {{zIndex: '2'}}>
                        Ordenar por: {' '}
                        <Dropdown inline options={this.state.opcionesOrdenar} defaultValue={this.state.opcionesOrdenar[0].value} onChange = {(e,data)=>{this._orderFiles(data.value)}} />
                    </span>
                    }
                </Grid.Column>
            </Grid.Row>
            {
                arrayRoot.map((array, key) => {
                    return(
                        <Grid.Row key={key} columns = {NUMBER_ELEMENT_VIEW}>
                            {this._renderGridElement(array)}
                        </Grid.Row>
                    )
                })
            }
        </React.Fragment>
        )
    }

    _orderFiles(tipo){
        switch(tipo){
            case 0:
            break;
            case 1:
                this.props.orderByNombre();
            break;
            case 2:
                this.props.orderByFecha();
            break;
            case 3:
                this.props.orderByTipo();
            break;
            case 4:
                this.props.orderBySize();
            break;
            default:
        }
    }

    _renderGridElement(elements){
        return elements.map((item, key) => {            
            return(
                <Grid.Column key = {key}>
                    <FileItem file = {item} idFile = {item.idArchivo} nombreArchivo = {item.nombreCorto} titulo = {item.nombre} fecha = {item.fechaSubida} tipo={item.tipo} selected = {item.selected} />
                </Grid.Column>
            )
        })
    }

    _renderFiles(){
        let datos = _.chunk(this.props.userFiles.files, NUMBER_ELEMENT_VIEW)
        return this._renderGridRow(datos)
    }
    _uploadFiles(e){
        let files = e.target.files

        if(!files){
            return
        }

        this.setState({uploadFiles: true})

        let data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('files[]', files[i]);
        }
        
        ApiService.uploadFiles(data)
        .then(resp =>{
            this.props.addFiles(resp.archivos);
            this.props.setEnUso(resp.enUso)
            this.props.resetUpload()
            this.setState({uploadFiles: false})
            this.setState({isEmpty: false})
        })
        .catch(err =>{
            this.setState({uploadFiles: false})
            this.setState({isEmpty: true})
        })
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
            <React.Fragment>
                <Segment placeholder basic>
                    <Header icon>
                        <Icon name = 'file alternate outline' />
                        <p>Aun no hay archivos para mostrar</p>
                    </Header>
                        <Button primary size ='large' loading = {this.state.uploadFiles} onClick = {() => this.fileInputReference.current.click()}>
                            Subir archivo
                        </Button>
                        <input 
                            ref = {this.fileInputReference}
                            type = 'file'
                            hidden
                            multiple
                            onChange = {this._uploadFiles}
                        />
                </Segment>
            </React.Fragment>
        )
    }


    render(){
        return(
            <React.Fragment>
                
                <Container fluid style = {this.state.scrollEnabled? scrollStyle : {}}>
                    <Segment basic>
                        {(this.state.isEmpty || this.props.userFiles.files.length === 0) && this._fileContainerWithoutFiles()}
                        {(!this.state.isEmpty || this.props.userFiles.files.length !== 0) && this._fileContainer()}
                    </Segment>
                </Container>
            </React.Fragment>
        )
    }
}

const scrollStyle = {overflowY: 'scroll', overflowX: 'hidden', maxHeight: '40rem'}

const mapStateToProps = state =>{
    return{
        userFiles: state.userFiles,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addFiles(files){
            dispatch(fileActions.addFile(files))
        },
        setEnUso(enUso){
            dispatch(userActions.setEnUso(enUso))
        },
        resetUpload(){
            dispatch(resetUploadProgress())
        },
        orderByNombre(){
            dispatch(fileActions.orderFilesByName())
        },
        orderByFecha(){
            dispatch(fileActions.orderFilesByDate())
        },
        orderBySize(){
            dispatch(fileActions.orderFilesBySize())
        },
        orderByTipo(){
            dispatch(fileActions.orderFilesByType())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContenedorArchivos)