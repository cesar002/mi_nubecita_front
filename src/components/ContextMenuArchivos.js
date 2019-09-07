import React, { Component } from 'react';
import {Menu, Icon} from 'semantic-ui-react'
import {MenuItem, ContextMenu} from 'react-contextmenu'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import ApiService from '../services/ApiService'

import {deleteFiles, clearFilesTemp} from '../redux/actions/userDataFilesActions'

class ContextMenuArchivos extends Component{
    constructor(props){
        super(props)

        this._deleteFiles = this._deleteFiles.bind(this)
        this._renderMenuItems = this._renderMenuItems.bind(this)
        this._handleFunctionMenu = this._handleFunctionMenu.bind(this)

        this.state = {
            menuData: [
                { idMenu: 0, name: 'Crear nueva carpeta',  icon: 'folder'},
                { idMenu: 1, name: 'Agregar a favoritos',  icon: 'star outline' },
                { idMenu: 2, name: 'Eliminar',  icon: 'trash alternate outline' },
                { idMenu: 3, name: 'Compartir',  icon: 'share' },
                { idMenu: 4, name: 'Mover a',  icon: 'folder outline' },
            ]
        }
    }

    static propTypes = {
        idContextTrigger: PropTypes.string.isRequired,
    }

    _handleFunctionMenu(idMenu){
        switch(idMenu){
            case 0:

            case 1:

            case 2:
                this._deleteFiles()
            break;
            case 3:

            case 4:

            default:
        }
    }
    
    _deleteFiles(){
        ApiService.deleteFiles(this.props.userFiles.filesSelected)
        .then(resp =>{
            this.props.deleteFiles();
            this.props.clearFilesSelected();
        })
        .catch(err =>{

        });
    }

    _renderMenuItems(){
        return this.state.menuData.map((item, key) =>
            <MenuItem key={key} onClick = {()=>{}}>
                <Menu.Item onClick={()=>{ this._handleFunctionMenu(item.idMenu) }}>
                    {item.name}
                    <Icon name = {item.icon} />
                </Menu.Item>
            </MenuItem>
        )
    }


    render(){
        return(
            <React.Fragment>
                <div className = 'context-menu'>
                    <ContextMenu id = {this.props.idContextTrigger}>
                        <Menu inverted vertical>
                            {this._renderMenuItems()}
                        </Menu>
                    </ContextMenu>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>{
    return{
        userFiles: state.userFiles,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        deleteFiles(){
            dispatch(deleteFiles())
        },
        clearFilesSelected(){
            dispatch(clearFilesTemp())
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ContextMenuArchivos)
