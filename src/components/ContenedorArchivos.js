import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Grid, Container, Segment, Header, Icon, Button, Dropdown} from 'semantic-ui-react';
import {ContextMenuTrigger} from 'react-contextmenu'
import _ from 'lodash'

import {NUMBER_ELEMENT_VIEW} from '../utils/Constants'

import FileItem from '../components/FileItem'
import MenuContextual from '../components/ContextMenuArchivos'
import ApiService from '../services/ApiService';

import * as fileActions from '../redux/actions/userDataFilesActions';
import * as userActions from '../redux/actions/userDataAction'
import {resetUploadProgress} from '../redux/actions/uploadProgressAction'

class ContenedorArchivos extends Component{

    constructor(props){
        super(props)

        this._uploadFiles = this._uploadFiles.bind(this)
        this.fileInputReference = React.createRef()

        this.state = {
            scrollEnabled: false,
            isEmpty: true,
            uploadFiles: false,
        }

    }

    componentWillMount(){
        this.props.userFiles.files.length === 0? this.setState({isEmpty: true}) : this.setState({isEmpty: false})
        if(this.props.userFiles.files.length > 15){
            this.setState({scrollEnabled: true})
        }
    }
    _renderGridRow(arrayRoot){
        
        return(
        <React.Fragment>
            <Grid.Row>
                <Grid.Column width = {16}>
                    <span>
                        Ordenar por: {' '}
                        <Dropdown inline text = 'predeterminado' simple item />
                    </span>
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

    _renderGridElement(elements){
        return elements.map((item, key) => {            
            return(
                <Grid.Column key = {key}>
                    <FileItem nombreArchivo = {item.nombreCorto} titulo = {item.nombre} fecha = {item.fechaSubida} tipo={item.tipo} />
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
        })
        .catch(err =>{
            this.setState({uploadFiles: false})
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

const mapStateToProps = state =>{
    return{
        userFiles: state.userFiles
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContenedorArchivos)