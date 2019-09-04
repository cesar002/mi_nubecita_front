import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Menu, Icon, Progress, Segment, Button} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'


import FormatBytes from '../utils/FormatBytes'
import * as actions from '../redux/actions/menuActions';
import * as fileActions from '../redux/actions/userDataFilesActions';
import * as userActions from '../redux/actions/userDataAction'
import {resetUploadProgress} from '../redux/actions/uploadProgressAction'
import Apiservice from '../services/ApiService';



class MenuNav extends Component{
    constructor(props){
        super(props)

        this.uploadFiles = this.uploadFiles.bind(this)
        this.fileInputRef = React.createRef()
        this.renderMenuElements = this.renderMenuElements.bind(this)
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this)

        this.state = {
            upload:false,
        }

    }

    uploadFiles(e){
        let files = e.target.files
        if(!files){
            return
        }

        this.setState({upload: true})

        let data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('files[]', files[i]);
        }

        Apiservice.uploadFiles(data)
        .then(res => {
            this.props.addFiles(res.archivos);
            this.props.setEnUso(res.enUso)
            this.props.resetUpload()
            this.setState({upload: false})
        })
        .catch(err =>{
            this.setState({upload: false})
        })
    }

    handleMenuItemClick(menuItem){
        this.props.activeMenuElement(menuItem.idMenu)
        this.props.history.push(menuItem.route)
    }

    renderMenuElements(){
        return this.props.menu.map( menuItem => {
            return(
                <Menu.Item key = {menuItem.idMenu} name = {menuItem.name} active = {menuItem.active} onClick = {()=>{ this.handleMenuItemClick(menuItem) }}>
                    <Icon name = {menuItem.icon} />
                    <p className = {isMobile? '' : 'text-menu-item'}>{menuItem.name}</p>
                </Menu.Item>
            )
        })
    }

    _renderDesktopInterface(){
        return(
            <Menu vertical pointing secondary fluid >
                {this.renderMenuElements()}
            </Menu>
        )
    }

    _renderMobileInterface(){
        return(
            <Menu stackable fluid>
                {this.renderMenuElements()}
            </Menu>
        )
    }

    _convertPorcentaje(){
        if(!this.props.userData){
            return 0;
        }
        return Math.round(this.props.userData.enUso * 100)/(this.props.userData.limiteAlmacenaje.limite * 1000)
    }

    render(){
        return(
            <React.Fragment>
                <Segment basic>
                    {isMobile && this._renderMobileInterface()}
                    {!isMobile && this._renderDesktopInterface()}
                </Segment>
                <Segment basic>
                    {
                        this.state.upload &&
                        <Progress percent = {this.props.uploadProgress.inProgress} size = 'small' color = 'green' label = 'subiendo archivos' progress active/>
                    }
                    <Button loading = {this.state.upload} color = 'teal' fluid labelPosition = 'left' icon = 'cloud upload' content = 'Subir archivo' onClick = {()=> this.fileInputRef.current.click()} />
                    <input 
                        ref = {this.fileInputRef}
                        type = 'file'
                        hidden
                        multiple
                        onChange = {this.uploadFiles}
                    />
                </Segment>
                <Segment basic>
                    {(this.props.userData && Object.keys(this.props.userData).length !== 0) && 
                    <Progress percent = {this._convertPorcentaje()} size = 'tiny' color = 'teal'>
                        {FormatBytes(this.props.userData.enUso)} de {this.props.userData.limiteAlmacenaje.limite/1000000} GB usados
                    </Progress>
                    }
                </Segment>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return{
        menu: state.menuData.menuData,
        userData: state.userData,
        uploadProgress: state.uploadProgress,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        activeMenuElement(idMenu){
            dispatch(actions.activeMenuElement(idMenu))
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuNav))