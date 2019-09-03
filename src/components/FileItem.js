import React, { PureComponent } from 'react';
import {Segment, Container, Header, Checkbox, Item} from 'semantic-ui-react'
import FileIcon, { defaultStyles } from 'react-file-icon';
import * as moment from 'moment';
import PropTypes from 'prop-types';

class FileItem extends PureComponent{
    constructor(props){
        super(props)

        this._toggleIsChecked = this._toggleIsChecked.bind(this)
        this._toggleCheckedIsVisible = this._toggleCheckedIsVisible.bind(this)
        this.getStylesDefault = this.getStylesDefault.bind(this)

        this.state = {
            isCheked: false,
            checkedIsVisible: false,
        }
    }

    getStylesDefault(){
        switch(this.props.tipo){
            case 'jpg':
                return {...defaultStyles.jpg, labelUppercase: true}
            case 'jpeg':
                return {...defaultStyles.jpeg, labelUppercase: true}
            case 'png':
                return {...defaultStyles.png, labelUppercase: true}
            case 'gif':
                return {...defaultStyles.gif, labelUppercase: true}
            case 'bmp':
                return {...defaultStyles.bmp, labelUppercase: true}
            case 'pdf':
                return {...defaultStyles.pdf, labelUppercase: true}
            case 'avi':
                return {...defaultStyles.avi, labelUppercase: true}
            case 'mp4':
                return {...defaultStyles.mp4, labelUppercase: true}
            case 'mkv': 
                return {...defaultStyles.mkv, labelUppercase: true}
            case 'wmv':
                return {...defaultStyles.wmv, labelUppercase: true}
            case 'mp3':
                return {...defaultStyles.mp3, labelUppercase: true}
            case 'mpeg':
                return {...defaultStyles.mpeg, labelUppercase: true}
            case 'mpg':
                return {...defaultStyles.mpg, labelUppercase: true}
            case 'pdf':
                return {...defaultStyles.pdf, labelUppercase: true}
            case 'wav':
                return {...defaultStyles.wav, labelUppercase: true}
            case 'exe':
                return {...defaultStyles.exe, labelUppercase: true}
            case 'msi':
                return {...defaultStyles.exe, labelUppercase: true}
            case 'rar':
                return {...defaultStyles.rar, labelUppercase: true}
            case '7zip':
                return {...defaultStyles["7zip"], labelUppercase: true}
            default:
                return {
                    extension:"File",
                    labelUppercase: true,
                    labelColor: '#5858FA'
                }
            
        }
    }

    _toggleCheckedIsVisible(){
        let isVisible = this.state.checkedIsVisible
        this.setState({checkedIsVisible: !isVisible})
    }

    _toggleIsChecked(){
        let cheked = this.state.isCheked
        this.setState({isCheked: !cheked})
    }


    render(){
        let stylesFile = this.getStylesDefault();
        return(
            <React.Fragment>
                <div className = {this.state.isCheked? 'file-element-cheked' : 'file-element'} 
                    onMouseOver = {this._toggleCheckedIsVisible} onMouseOut = {this._toggleCheckedIsVisible} 
                    onClick = {this._toggleIsChecked} title = {this.props.titulo}
                >
                    <div className = 'file-element-check'>
                        { (this.state.checkedIsVisible || this.state.isCheked) && 
                        <Checkbox checked = {this.state.isCheked} style = {{marginLeft: '0.5rem', marginTop: '0.5rem'}} />}
                    </div>
                    <div className = 'file-element-body'>
                        <Container fluid textAlign = 'center'>
                        <Segment basic>
                            <Header icon>
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
}

FileItem.defaultProps = {
    fecha: '',
    titulo: '',
}

export default FileItem;