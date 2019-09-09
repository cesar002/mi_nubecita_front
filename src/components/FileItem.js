import React, { Component } from 'react';
import {Segment, Container, Header, Checkbox, Item} from 'semantic-ui-react'
import FileIcon, { defaultStyles } from 'react-file-icon';
import {connect} from 'react-redux'
import * as moment from 'moment';
import PropTypes from 'prop-types';

import * as filesAction from '../redux/actions/userDataFilesActions'

class FileItem extends Component{
    constructor(props){
        super(props)

        this._toggleCheckedIsVisible = this._toggleCheckedIsVisible.bind(this)
        this.getStylesDefault = this.getStylesDefault.bind(this)

        this.state = {
            checkedIsVisible: false,
        }
    }

    getStylesDefault(){
        switch(this.props.tipo){
            case 'jpg':
                return {...defaultStyles.jpg, labelUppercase: true, labelColor: '#00BFFF'}
            case 'jpeg':
                return {...defaultStyles.jpeg, labelUppercase: true, labelColor: '#00BFFF'}
            case 'png', 'PNG':
                return {...defaultStyles.png, labelUppercase: true, labelColor: '#0080FF'}
            case 'gif':
                return {...defaultStyles.gif, labelUppercase: true, labelColor: '#04B4AE'}
            case 'bmp':
                return {...defaultStyles.bmp, labelUppercase: true, labelColor: '#81DAF5'}
            case 'pdf':
                return {...defaultStyles.pdf, labelUppercase: true}
            case 'avi':
                return {...defaultStyles.avi, labelUppercase: true, labelColor: '#FE9A2E'}
            case 'mp4':
                return {...defaultStyles.mp4, labelUppercase: true, labelColor: '#FE2E2E'}
            case 'mkv': 
                return {...defaultStyles.mkv, labelUppercase: true, labelColor: '#FF8000'}
            case 'wmv':
                return {...defaultStyles.wmv, labelUppercase: true, labelColor: '#F3E2A9'}
            case 'mp3':
                return {...defaultStyles.mp3, labelUppercase: true, labelColor: '#81DAF5'}
            case 'mpeg':
                return {...defaultStyles.mpeg, labelUppercase: true, labelColor: '#58FAF4'}
            case 'mpg':
                return {...defaultStyles.mpg, labelUppercase: true, labelColor: '#81F7BE'}
            case 'wav':
                return {...defaultStyles.wav, labelUppercase: true, labelColor: '#9AFE2E'}
            case 'exe', 'msi':
                return {...defaultStyles.exe, labelUppercase: true, labelColor: '#0174DF'}
            case 'rar':
                return {...defaultStyles.rar, labelUppercase: true, labelColor: '#A901DB'}
            case '7zip':
                return {...defaultStyles["7zip"], labelUppercase: true, labelColor: '#585858'}
            case 'doc':
                return {...defaultStyles.doc, labelUppercase: true}
            case 'docx':
                return {...defaultStyles.docx, labelUppercase: true}
            case 'xls':
                return {...defaultStyles.xls, labelUppercase: true}
            case 'xlsx':
                return {...defaultStyles.xlsx, labelUppercase: true}
            case 'xlr':
                return {...defaultStyles.xlr, labelUppercase: true}
            case 'ppt':
                return {...defaultStyles.ppt, labelUppercase: true}
            case 'pptx':
                return {...defaultStyles.pptx, labelUppercase: true}
            case 'aac':
                return {...defaultStyles.aac, labelUppercase: true, labelColor: '#B45F04'}
            default:
                return {
                    type: 'document',
                    labelUppercase: true,
                    labelColor: '#FFFFF'
                }
            
        }
    }

    _toggleCheckedIsVisible(){
        let isVisible = this.state.checkedIsVisible
        this.setState({checkedIsVisible: !isVisible})
    }

    _fileHandle(status){
        if(!status){
            this.props.addFileTemp(this.props.file)
        }else{
            this.props.removeFileTemp(this.props.userFiles.filesSelected, this.props.idFile)
        }
    }


    render(){
        let stylesFile = this.getStylesDefault();
        return(
            <React.Fragment>
                <div className = {this.state.isCheked? 'file-element-cheked' : 'file-element'} 
                    onMouseOver = {this._toggleCheckedIsVisible} onMouseOut = {this._toggleCheckedIsVisible} 
                    onClick = {()=>{
                        this.props.toggleSelect(this.props.idFile, this.props.selected)
                        this._fileHandle(this.props.selected)
                    }} title = {this.props.titulo}
                >
                    <div className = 'file-element-check'>
                        { (this.state.checkedIsVisible || this.props.selected) && 
                        <Checkbox checked = {this.props.selected} style = {{marginLeft: '0.5rem', marginTop: '0.5rem'}} />}
                    </div>
                    <div className = 'file-element-body'>
                        <Container fluid textAlign = 'center'>
                        <Segment basic>
                            <Header icon >
                                <FileIcon extension = {this.props.tipo} {...stylesFile} size = {55} />
                                <p style={{fontSize: '0.9rem'}}>{this.props.nombreArchivo}</p>
                            </Header>
                            <Segment.Inline>
                                <Header as = 'h6' color = 'grey'>
                                    {moment(this.props.fecha).format('ll')}
                                </Header>
                            </Segment.Inline>
                        </Segment>
                        </Container>
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

FileItem.propTypes = {
    nombreArchivo: PropTypes.string.isRequired,
    titulo: PropTypes.string,
    fecha: PropTypes.string,
    idFile: PropTypes.string,
    selected: PropTypes.bool,
    file: PropTypes.object,
}

FileItem.defaultProps = {
    fecha: '',
    titulo: '',
    idFile: '',
    selected: false,
    file: {},
}

const mapStateToProps = state => {
    return{
        userFiles: state.userFiles,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addFileTemp(file){
            dispatch(filesAction.addFilesTemp(file))
        },
        removeFileTemp(deleteFiles, idFile){
            let file = deleteFiles.find(f => f.idArchivo === idFile)
            dispatch(filesAction.removeFilesTemp(file.idArchivo))
        },
        toggleSelect(idFile, selected){
            let _selected = !selected
            dispatch(filesAction.toggleSelectFileStatus({idFile: idFile, selected: _selected}))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileItem);